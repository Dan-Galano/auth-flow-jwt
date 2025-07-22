import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="flex justify-center items-center h-dvh">
      <form className="flex flex-col p-12 outline-1 gap-5 rounded-lg text-center">
        <div className="flex flex-col gap-1">
          <p className="text-h5">Enter the Portal</p>
          <p className="text-md text-grey">Prove your worth to step inside.</p>
        </div>
        <input
          className="outline-none focus:outline-none focus:ring-2 focus:ring-white rounded-[10px] p-4 bg-ui-1"
          placeholder="Email"
          type="email"
          name="email"
        ></input>
        <input
          className="outline-none focus:outline-none focus:ring-2 focus:ring-white rounded-[10px] p-4 bg-ui-1"
          placeholder="Password"
          type="password"
          name="password"
        ></input>
        <button className="btn-light" type="submit">
            <span>Login</span>
        </button>
        <div className="flex justify-center text-sm gap-2">
          <span className="text-grey">New to this realm?</span>{" "}
          <Link to={"/signup"}>
            <span className="relative hover-underline">Sign up now</span>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
