import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./context/theme-provider";
import AppRoutes from "./routes";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AppRoutes />
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
