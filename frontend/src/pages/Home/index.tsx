import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return <div>Home

    <Link to={"/overview"}>overview</Link>
  </div>;
};

export default Home;
