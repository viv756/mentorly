import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import UserSkillModel from "../models/user-skill.model";
import mongoose from "mongoose";

export type ChatMessage = { from: "user" | "assistant"; content: string };

export type MentorIntent = {
  type: "followup" | "search";
  message?: string; // if followup
  skill?: string;
  experience?: string;
  level?: string;
  rating?: string;
  goal?: string;
};

const SYSTEM_PROMPT = `
You are an AI assistant for a mentoring platform.

Your task:
- Understand the user's intent to find a mentor.
- Extract the following information if provided:
  - skill (required)
  - experience in years (optional)
  - level (beginner/intermediate/advanced, optional)
  - rating (optional)
  - goal (optional)

Rules:
1. If required information is missing (skill), return ONLY this JSON:
   {
     "type": "followup",
     "message": "<short question>"
   }

2. If required information is known (skill), return ONLY this JSON:
   {
     "type": "search",
     "skill": "<skill name>",
     "experience": "<years or empty>",
     "level": "<beginner/intermediate/advanced or empty>",
     "rating": "<rating or empty>",
     "goal": "<goal or empty>"
   }

3. Always return valid JSON.
4. Do NOT include explanations.
5. Ask only ONE follow-up question at a time.
6. Do not repeat previous questions.
`;

export const aiAssistantService = async (messages: ChatMessage[], userId: string) => {
  try {
    if (!messages || !Array.isArray(messages)) {
      throw new Error("Messages array is required");
    }

    // 1️⃣ Call AI to extract intent
    const result = await generateText({
      model: google("gemini-1.5-flash"),
      system: SYSTEM_PROMPT,
      messages,
    });

    const aiResponse: MentorIntent = JSON.parse(result.text);

    // 2️⃣ If AI says follow-up, include "from: assistant"
    if (aiResponse.type === "followup") {
      return {
        ...aiResponse,
        from: "assistant", // frontend can use this to render message
      };
    }

    // 3️⃣ If AI intent is clear, search DB using aggregation
    if (aiResponse.type === "search") {
      const mentors = await UserSkillModel.aggregate([
        {
          $match: {
            skillName: { $regex: aiResponse.skill, $options: "i" },
            skillType: "TEACH",
            ...(aiResponse.level ? { skillLevel: aiResponse.level } : {}),
            ...(aiResponse.experience
              ? { experienceYears: { $gte: Number(aiResponse.experience) } }
              : {}),
            userId: { $ne: new mongoose.Types.ObjectId(userId) }, // <-- exclude current user
          },
        },
        {
          $lookup: {
            from: "profiles",
            localField: "userId",
            foreignField: "userId",
            as: "profile",
          },
        },
        { $unwind: "$profile" },
        {
          $project: {
            _id: 1,
            skillName: 1,
            skillLevel: 1,
            experienceYears: 1,
            description: 1,
            userId: 1,
            "profile.avatar": 1,
            "profile.bio": 1,
            "profile.aboutMe": 1,
            "profile.rating": 1,
          },
        },
        { $limit: 5 },
      ]);

      return {
        type: "searchResults",
        mentors,
      };
    }

    // fallback
    return {
      type: "followup",
      message: "Sorry, I couldn't understand that. Could you rephrase?",
      from: "assistant",
    };
  } catch (error) {
    console.error("AI Assistant error:", error);
    return {
      type: "followup",
      message: "Sorry, I couldn't understand that. Could you rephrase?",
      from: "assistant",
    };
  }
};
