import { useAuthStore } from "@/store/store";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuthStore();
  return (
    <div>
      Home
      <Link to={"/overview"}>overview</Link>
    </div>
  );
};

export default Home;
