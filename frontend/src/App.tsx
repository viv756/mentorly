import { Toaster } from "./components/ui/sonner";
import QueryProvider from "./context/query-provider";
import { ThemeProvider } from "./context/theme-provider";
import AppRoutes from "./routes";

const App = () => {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AppRoutes />
        <Toaster position="top-center"/>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default App;
