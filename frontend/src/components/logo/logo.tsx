import { Link } from "react-router-dom";
import { Rabbit } from "lucide-react";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center gap-2">
      <div className="bg-red-600 text-white h-6.5 w-6.5 rounded flex items-center justify-center">
        <Rabbit className="size-4" />
      </div>
      <span className="font-semibold text-lg">Mentorly</span>
    </Link>
  );
};

export default Logo;
