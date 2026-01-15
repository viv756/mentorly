import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/header";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="min-h-svh lg:p-2 overflow-hidden  w-full">
        <main className="lg:border overflow-hidden lg:rounded-xl flex flex-col items-center justify-start h-full w-full bg-background">
          <Header />
          <div className="w-full overflow-auto max-w-full px-4 flex-1 pb-2">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
