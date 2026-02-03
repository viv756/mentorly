import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/header";

const AppLayout = () => {
  const location = useLocation();
  const isDiscoverAi = location.pathname.includes("/ai-search");

  return (
    <SidebarProvider className="bg-sidebar">
      <AppSidebar />
      <div className="min-h-svh lg:p-2 overflow-hidden w-full">
        <main className="lg:border relative overflow-hidden lg:rounded-xl flex flex-col h-svh lg:h-[calc(100svh-1rem)] w-full bg-background">
          <Header />
          <div
            className={`w-full max-w-full sm:px-4 px-2 flex-1 pb-2 ${isDiscoverAi ? "overflow-hidden" : "overflow-auto"}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
