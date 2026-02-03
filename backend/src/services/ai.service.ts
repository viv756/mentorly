import mongoose from "mongoose";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { z } from "zod";
import { generateText } from "ai";
import { Env } from "../config/env.config";
import UserSkillModel from "../models/user-skill.model";
import { ChatMessagesType } from "../validator/ai.validator";
import { SkillTypeEnum } from "../enums/skill.enum";

const openRouter = createOpenRouter({
  apiKey: Env.OPEN_ROUTER_API_KEY,
});

/* ======================
   ZOD SCHEMA
====================== */

export const MentorIntentSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("followup"),
    content: z.string(),
  }),
  z.object({
    type: z.literal("search"),
    skill: z.string(),
    experience: z.string().optional(),
    level: z.string().optional(),
    rating: z.string().optional(),
    goal: z.string().optional(),
  }),
]);

export type MentorIntent = z.infer<typeof MentorIntentSchema>;

/* ======================
   SYSTEM PROMPT
====================== */

// const SYSTEM_PROMPT = `
// You are an intent classifier for a mentoring platform.

// You will receive a conversation history.
// IMPORTANT:
// - Only consider messages where role = "user".
// - Ignore all assistant messages completely.
// - The MOST RECENT user message has the highest priority.
// - If multiple user messages mention different skills, use ONLY the latest one.

// Goal:
// Determine whether the user wants to search for a mentor and extract intent data.

// Required field:
// - skill

// Optional fields:
// - experience (years)
// - level (beginner | intermediate | advanced)
// - rating
// - goal

// Decision rules:

// 1. Identify the latest user message.
// 2. Check ONLY that message for a skill.
// 3. If the latest user message does NOT clearly mention a skill, return ONLY:
// {
//   "type": "followup",
//   "content": "What skill would you like to learn or improve?"
// }

// 4. If the latest user message DOES mention a skill, return ONLY:
// {
//   "type": "search",
//   "skill": "<detected skill>",
//   "experience": "",
//   "level": "",
//   "rating": "",
//   "goal": ""
// }

// Output rules:
// - Output MUST be valid JSON
// - Do NOT include explanations
// - Do NOT include markdown
// - Do NOT repeat a previously asked question
// - Ask only ONE follow-up question
// `;

const SYSTEM_PROMPT = `
You are an intent classifier for a mentoring platform.

You will receive a conversation history.

IMPORTANT:
- Only consider messages where role = "user".
- Ignore all assistant messages completely.
- The MOST RECENT user message has the highest priority.
- If the latest user message mentions a NEW skill, use that skill.
- If the latest user message does NOT mention a skill, reuse the MOST RECENT skill mentioned earlier (if any).

Goal:
Determine whether the user wants to search for a mentor and extract intent data.

Required field:
- skill

Optional fields:
- experience (years)
- level (beginner | intermediate | advanced)
- rating
- goal

Decision rules:

1. Scan user messages from newest → oldest.
2. If the latest user message clearly mentions a skill, use it.
3. If the latest user message does NOT mention a skill:
   - Look backward in user messages.
   - If a skill was mentioned previously, reuse that skill.
4. Only if NO skill is found anywhere in the user messages, ask ONE follow-up question to understand:
   - what skill they want help with
   - and what they are trying to achieve

Follow-up response format (ONLY if no skill exists):
{
  "type": "followup",
  "content": "<ask a natural, conversational question to discover the user's skill and goal>"
}

Search response format (if a skill is available):
{
  "type": "search",
  "skill": "<detected skill>",
  "experience": "",
  "level": "",
  "rating": "",
  "goal": ""
}

Follow-up question rules:
- Ask only ONE question
- Do NOT use a fixed or repeated sentence
- Be friendly and conversational
- The question must help identify the skill and learning need

Output rules:
- Output MUST be valid JSON
- Do NOT include explanations
- Do NOT include markdown
- Do NOT repeat a previously asked question
`;

const REASON_PROMPT = `
You are helping a user choose the best mentor.

Rules:
- Generate EXACTLY ONE natural sentence per mentor.
- Each sentence must clearly explain why this mentor fits the user's needs.
- Do NOT start sentences with "This mentor".
- Do NOT repeat sentence structure across mentors.
- Mention relevant details naturally (skill, level, experience, rating).
- Keep each sentence under 15 words.
- Be confident and human-like, not generic or robotic.
- Do NOT include mentor names.
- Return ONLY a JSON array of strings.

Example:
"Great fit for intermediate learners, blending practical experience with strong mentor ratings."
`;

/* ======================
   SERVICE
====================== */

export const aiAssistantService = async (messages: ChatMessagesType, userId: string) => {
  try {
    if (!Array.isArray(messages)) {
      throw new Error("Messages array is required");
    }

    // 1️⃣ Call AI to get intent (just plain text)
    const result = await generateText({
      model: openRouter("google/gemini-2.5-flash"),
      maxOutputTokens: 300,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    });

    // 2️⃣ Parse JSON safely
    let aiResponse: MentorIntent;
    try {
      aiResponse = JSON.parse(result.text) as MentorIntent;
    } catch (err) {
      console.error("Failed to parse AI JSON:", result.text);
      return {
        type: "followup",
        content: "Sorry, I couldn't understand that. Could you rephrase?",
        role: "assistant",
      };
    }

    // 3️⃣ Handle follow-up
    if (aiResponse.type === "followup") {
      return { ...aiResponse, role: "assistant" };
    }

    // 4️⃣ SEARCH DB
    const matchFilter: any = {
      skillName: { $regex: aiResponse.skill, $options: "i" },
      skillType: SkillTypeEnum.TEACH,
      userId: { $ne: new mongoose.Types.ObjectId(userId) },
    };

    if (aiResponse.level?.trim()) {
      matchFilter.skillLevel = aiResponse.level.toUpperCase(); // Normalize
    }

    if (aiResponse.experience?.trim()) {
      const expNum = Number(aiResponse.experience);
      if (!isNaN(expNum)) matchFilter.experienceYears = { $gte: expNum };
    }

    const mentors = await UserSkillModel.aggregate([
      // 1️⃣ Match by skill, level, etc.
      { $match: matchFilter },

      // 2️⃣ Join USERS (for lastActiveAt)
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      // 3️⃣ Join PROFILES
      {
        $lookup: {
          from: "profiles",
          localField: "userId",
          foreignField: "userId",
          as: "profile",
        },
      },
      { $unwind: "$profile" },

      // 4️⃣ Sort by lastActiveAt (most recent first)
      {
        $sort: {
          "user.lastActiveAt": -1, // DESC
          "profile.rating.average": -1,
        },
      },

      // 5️⃣ Take only top 5 most active mentors
      { $limit: 5 },

      // 6️⃣ Shape final output
      {
        $project: {
          _id: 1,
          userId: 1,

          skillName: 1,
          skillLevel: 1,
          experienceYears: 1,

          "user.name": 1,
          "user.lastActiveAt": 1,

          "profile.avatar": 1,
          "profile.bio": 1,
          "profile.aboutMe": 1,
          "profile.rating": 1,
        },
      },
    ]);

    // 5️⃣ If mentors found, get AI reasons
    if (mentors.length > 0) {
      const mentorContext = mentors.map((m) => ({
        skill: m.skillName,
        level: m.skillLevel,
        experience: m.experienceYears ?? 0,
        rating: m.profile.rating?.average ?? null,
        bio: m.profile.bio ?? "",
      }));

      // Generate reasons
      const reasonResult = await generateText({
        model: openRouter("google/gemini-2.5-flash"),
        maxOutputTokens: 200,
        messages: [
          {
            role: "system",
            content: REASON_PROMPT,
          },
          {
            role: "user",
            content: JSON.stringify({
              userIntent: aiResponse,
              mentors: mentorContext,
            }),
          },
        ],
      });

      let reasons: string[] = [];
      try {
        reasons = JSON.parse(reasonResult.text) as string[];
      } catch {
        reasons = mentorContext.map(() => "Good fit based on your learning goals.");
      }

      const enrichedMentors = mentors.map((mentor, i) => ({
        ...mentor,
        reason: reasons[i] ?? "Good fit based on your learning goals.",
      }));

      return {
        role: "assistant",
        type: "searchResults",
        mentors: enrichedMentors,
      };
    }

    // 6️⃣ Return empty if no mentors
    return {
      role: "assistant",
      type: "followup",
      content: `I couldn’t find any active mentors for ${aiResponse.skill} right now. 
Would you like to try a different skill?`,
    };
  } catch (error) {
    console.error("AI Assistant error:", error);
    return {
      type: "followup",
      content: "Sorry, I couldn't understand that. Could you rephrase?",
      role: "assistant",
    };
  }
};
