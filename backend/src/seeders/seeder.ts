import dotenv from "dotenv";
dotenv.config();

import connectDatabase from "../config/database";
import UserModel from "../models/user.model";
import ProfileModel from "../models/profile.model";
import AccountModel from "../models/account.model";
import { hashValue } from "../utils/bcrypt";
import { usersSeedData } from "./data/users.seeder";
import { dummyProfiles } from "./data/profile.seeder";
import { ProviderEnum } from "../enums/account-provider.enum";
import { generateUserSkills } from "./data/skill.seeder";
import UserSkillModel from "../models/user-skill.model";
import BadgeModel from "../models/badge.model";
import { badge } from "./data/badge.seed";

type Platform = "linkedin" | "github" | "twitter";

const seedUsers = async () => {
  console.log("Seeder is running...");

  try {
    await connectDatabase();

    // Optional cleanup
    await AccountModel.deleteMany();
    await ProfileModel.deleteMany();
    await UserModel.deleteMany();
    await UserSkillModel.deleteMany();

    // 1️⃣ Hash passwords
    const usersWithHashedPasswords = await Promise.all(
      usersSeedData.map(async (user) => ({
        ...user,
        password: await hashValue(user.password),
      })),
    );

    // 2️⃣ Insert users
    const users = await UserModel.insertMany(usersWithHashedPasswords);
    console.log(`✅ Inserted ${users.length} users`);

    // 3️⃣ Create accounts + profiles
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const profileData = dummyProfiles[i];

      // Create account
      await AccountModel.create({
        userId: user._id,
        provider: ProviderEnum.EMAIL,
        providerId: user.email,
      });

      const skills = generateUserSkills(user._id, 7);
      await UserSkillModel.insertMany(skills);

      // Create profile
      await ProfileModel.create({
        ...profileData,
        userId: user._id,
        socialLinks: profileData.socialLinks.map((link) => ({
          platform: link.platform as Platform,
          url: link.url,
        })),
      });
    }

    console.log("✅ Users, accounts, and profiles seeded successfully");
  } catch (error) {
    console.error("❌ Seeder failed:", error);
  } finally {
    process.exit(0);
  }
};

export const seedBadges = async () => {
  try {
    console.log("🌱 Seeding badges...");
    await connectDatabase();

    const operations = badge.map((b) => ({
      updateOne: {
        filter: {
          key: b.key,
          level: b.level,
        },
        update: {
          $set: {
            name: b.name,
            icon: b.icon, // map correctly
            minValue: b.minValue,
          },
        },
        upsert: true,
      },
    }));

    await BadgeModel.bulkWrite(operations);

    console.log("✅ Badges seeded successfully");
  } catch (error) {
    console.error("❌ Badge seeding failed:", error);
  }
};

// seedUsers();
seedBadges();
