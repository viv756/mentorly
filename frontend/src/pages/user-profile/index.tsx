import Logo from "@/components/logo/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SkillCard from "./_components/user-skill-section";
import { ArrowRight, Linkedin } from "lucide-react";
import { Github } from "lucide-react";
import { Twitter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ScheduleMeetingModal from "./_components/schedule-meeting-modal";

const UserProfile = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="flex h-screen min-w-120 flex-col bg-[#F63049] p-9 ">
        {/* Profile Section */}
        <div className="flex-shrink-0">
          <Avatar className="h-45 w-45">
            <AvatarImage
              src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="Frank Flores"
              className="object-cover"
            />
            <AvatarFallback>FF</AvatarFallback>
          </Avatar>
        </div>

        {/* User Info */}
        <div className="mt-8 flex-shrink-0">
          <h1 className="text-4xl font-bold leading-tight">Frank Flores</h1>
          <p className="mt-2 text-lg font-medium ">Engineer for a better world</p>
        </div>

        {/* Logo - Pushed to bottom */}
        <div className="mt-auto">
          <Logo />
        </div>
      </aside>

      {/* Main Content Area */}
      <ScrollArea>
        <main className="flex-1 p-8 h-svh">
          <h1 className="text-3xl  mb-7 underline underline-offset-2 font-semibold ">
            Topics I actively mentor and guide others in
          </h1>
          <div className="flex justify-end pr-20 pb-7">
            <ScheduleMeetingModal />
          
          </div>
          <SkillCard />
          <div className="mt-10">
            <h2 className="text-3xl font-semibold">About Me</h2>
            <div className="flex gap-6 mt-4">
              <div className="h-16 w-16 border rounded-xl flex items-center justify-center bg-secondary">
                <Linkedin className="h-10 w-10" />
              </div>
              <div className="h-16 w-16 border rounded-xl flex items-center justify-center bg-secondary">
                <Github />
              </div>
              <div className="h-16 w-16 border rounded-xl flex items-center justify-center bg-secondary">
                <Twitter />
              </div>
            </div>
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
