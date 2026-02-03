import { Link } from "react-router-dom";
import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/store";

const Navbar = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <nav className="pt-5 sm:px-24 px-2 ">
      <div className="flex justify-between items-center">
        <div>
          <Logo />
        </div>
        {!user && (
          <Link to={"/sign-in"}>
            <Button className="h-10 ">Sign In</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
