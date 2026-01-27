import { SidebarTrigger } from "./ui/sidebar";
import { ThemeToggle } from "./theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuthStore } from "@/store/store";
import { DynamicBreadcrumb } from "./dynamic-breadcrumb";

const Header = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="w-full bg-background p-3 border-b">
      <div className="flex items-center">
        {/* Left */}
        <div className="flex gap-2 items-center">
          <SidebarTrigger className="md:hidden" />
          <DynamicBreadcrumb />
        </div>
        {/* Right */}
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          <Avatar className="size-10 ">
            <AvatarImage
              src={`${user?.avatar}` || "https://github.com/shadcn.png"}
              className="object-cover "
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
