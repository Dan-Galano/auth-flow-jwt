import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="grid place-items-center h-dvh text-center">
      <section className="flex flex-col gap-2">
        <p className="text-h5">Home</p>
        <div className="flex gap-4">
          <Link to={"/login"}>
            <span className="relative hover-underline">Login</span>
          </Link>
          <Link to={"/signup"}>
            <span className="relative hover-underline">Signup</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
