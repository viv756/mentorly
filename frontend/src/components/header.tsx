import { SidebarTrigger } from "./ui/sidebar";
import { ThemeToggle } from "./theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuthStore } from "@/store/store";

const Header = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="sticky top-0 z-10 w-full bg-background p-3 border-b">
      <div className="flex items-center">
        {/* Left */}
        <SidebarTrigger className="md:hidden" />
        {/* Right */}
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          <Avatar className="size-10">
            <AvatarImage src={`${user?.avatar}` || "https://github.com/shadcn.png"}/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
