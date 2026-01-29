import Navbar from "./_components/navbar";
import HeroLanding from "./_components/hero";
import { Meteors } from "@/components/ui/meteors";

const Home = () => {
  return (
    <>
      <div className="sm:px-30 px-2 ">
        <Meteors/>
        <Navbar />
        <HeroLanding />
      </div>
    </>
  );
};

export default Home;
