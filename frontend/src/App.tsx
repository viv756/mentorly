import { Toaster } from "./components/ui/sonner";
import QueryProvider from "./context/query-provider";
import { ThemeProvider } from "./context/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/react";
import AppRoutes from "./routes";

const App = () => {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <NuqsAdapter>
          <AppRoutes />
        </NuqsAdapter>
        <Toaster position="top-center" />
      </ThemeProvider>
    </QueryProvider>
  );
};

export default App;
