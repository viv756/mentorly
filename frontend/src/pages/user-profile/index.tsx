import { Link, Outlet, useParams } from "react-router-dom";
import Logo from "@/components/logo/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin } from "lucide-react";
import { Github } from "lucide-react";
import { Twitter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetUserDetailsById } from "@/hooks/api/profile/use-get-userDetailsById";
import SkillCardSection from "./_components/user-skill-section";

const SOCIAL_ICON_MAP = {
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
};

const UserProfile = () => {
  const { userId } = useParams();
  const { data, isLoading } = useGetUserDetailsById(userId as string);

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  const userProfile = data.userProfile;
  const skills = data.userProfile.skills;
  const socialLinks = data.userProfile.profile.socialLinks;

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <aside className="flex sm:h-screen sm:min-w-120  sm:max-w-120 flex-col bg-[#F63049] sm:pl-9 pl-5 py-9">
        {/* Profile Section */}
        <div className="shrink-0">
          <Avatar className="sm:h-45 sm:w-45 h-35 w-35">
            <AvatarImage
              src={userProfile.profile.avatar}
              alt="Frank Flores"
              className="object-cover"
            />
            <AvatarFallback>FF</AvatarFallback>
          </Avatar>
        </div>

        {/* User Info */}
        <div className="mt-6 shrink-0">
          <h1 className="sm:text-4xl text-3xl font-bold leading-tight">{userProfile.user.name}</h1>
          <p className="mt-1 text-lg font-medium">Top 1% Job Seeker Expert on Topmate | Recruitment Leader 🦄 | 20K+ resumes reviewed | 5K+ candidates interviewed | Founder of Eques Staffing</p>
        </div>
        <img
          src="https://cdn.iconscout.com/icon/premium/png-512-thumb/4-star-badge-icon-svg-download-png-3474612.png?f=webp&w=512"
          className="w-15 h-15"
          alt="kkkk"
        />

        {/* Logo - Pushed to bottom */}
        <div className="mt-auto hidden sm:block">
          <Logo />
        </div>
      </aside>

      {/* Main Content Area */}
      <ScrollArea>
        <main className="flex-1 p-8 h-svh">
          <h1 className="text-3xl  mb-7 underline underline-offset-2 font-semibold ">
            Topics I Mentor and Guide Learners In
          </h1>

          <SkillCardSection skills={skills} />
          <div className="mt-10">
            <h2 className="text-3xl font-semibold">About Me</h2>
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-6 mt-4">
                {socialLinks.map((socialLink) => {
                  const Icon = SOCIAL_ICON_MAP[socialLink.platform];
                  return (
                    <Link
                      target="_blank"
                      to={`${socialLink.url}`}
                      className="h-16 w-16 border rounded-xl flex items-center justify-center bg-secondary">
                      <Icon className="h-10 w-10" />
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="mt-10 pb-10">
              <p className="whitespace-pre-line">
                {`👋 Hi, I'm Frank Flores — an aspiring Full Stack Developer with a strong foundation in the MERN Stack, Java, SQL, and AWS, and a passion for solving real-world problems through code.

💻 With over 100+ projects across web, mobile, and API development, I've not only built scalable apps but also actively mentored juniors to kickstart their tech journey.

🚀 Currently on a mission to crack top tech placements, I combine deep technical knowledge with a growth mindset and consistent problem-solving in platforms like LeetCode and CodeStudio.

💡 What I Focus On:
🛠 Tech Stack Mastery – MERN, REST APIs, SQL, GitHub, and AWS
📚 DSA in Java – Arrays, Recursion, Trees, Graphs, DP & more
🏗 System Design – LLD fundamentals & real-world patterns
🎯 Placement Strategy – HR + Behavioral prep, mock interviews
🧠 Mindset Coaching – Confidence, discipline, clarity
🧑‍🎓 Mentorship – Roadmaps, resume reviews, GitHub feedback

✨ Whether you're just starting out or preparing for your dream company, I believe in a 360° approach to placements:
→ Mindset. Skills. Strategy.

📬 Let’s connect, grow, and crack it together!`}
              </p>
            </div>
          </div>
        </main>
        
      </ScrollArea>
    </div>
  );
};

export default UserProfile;
