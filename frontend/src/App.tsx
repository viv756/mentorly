import { ThemeProvider } from "./context/theme-provider";
import SignUp from "./pages/auth/sign-up";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <SignUp />
    </ThemeProvider>
  );
};

export default App;
