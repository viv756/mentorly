import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/header";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <main className="lg:border lg:rounded-xl overflow-hidden flex flex-col items-center justify-start h-full w-full bg-background">
          <Header />
          <div className="w-full max-w-full px-4 overflow-auto flex-1">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
