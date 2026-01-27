import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/store";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <nav className="pt-5">
      <div className="flex justify-between items-center">
        <div>
          <Logo />
        </div>
        {user ? (
          <Link to={"/overview"}>
            <Button className="h-10">DashBoard</Button>
          </Link>
        ) : (
          <Link to={"/sign-in"}>
            <Button className="h-10">Sign In</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
