import { Link, useParams } from "react-router-dom";
import { Linkedin, Github, Twitter, type LucideIcon } from "lucide-react";
import Logo from "@/components/logo/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetUserDetailsById } from "@/hooks/api/profile/use-get-userDetailsById";
import SkillCardSection from "./_components/user-skill-section";
import type { SocialIconKey, SocialLink } from "@/features/profile/types";

const SOCIAL_ICON_MAP: Record<SocialIconKey, LucideIcon> = {
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
  const socialLinks: SocialLink[] = data.userProfile.profile.socialLinks;

  return (
    <div className="flex flex-col sm:flex-row min-h-screen w-full">
      <aside className="flex sm:h-screen sm:min-w-120 sm:max-w-120 flex-col bg-[#F63049] sm:pl-9 pl-5 py-9">
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
          <p className="mt-1 text-md font-medium">{userProfile.profile.bio}</p>
        </div>
        <div className="mt-3 flex gap-3 flex-wrap">
          <img
            src="https://res.cloudinary.com/devincarloz/image/upload/v1769852323/OpenSourcerer_le9uha.png"
            className="w-15 h-15"
            alt="kkkk"
          />
        </div>

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
                {socialLinks.map((socialLink, i) => {
                  const Icon = SOCIAL_ICON_MAP[socialLink.platform];
                  return (
                    <Link
                      key={i}
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
              <p className="whitespace-pre-line">{`${userProfile.profile.aboutMe}`}</p>
            </div>
          </div>
        </main>
      </ScrollArea>
    </div>
  );
};

export default UserProfile;
