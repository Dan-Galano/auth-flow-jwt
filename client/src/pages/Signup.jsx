import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleChange = (value, setValue) => {
    setValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, confirmPassword);
  };

  return (
    <section className="flex justify-center items-center h-dvh">
      <form onSubmit={handleSubmit} className="flex flex-col p-12 outline-1 gap-5 rounded-lg text-center">
        <div className="flex flex-col gap-1">
          <p className="text-h5">Forge Your Identity</p>
          <p className="text-md text-grey">
            Enter the realm — leave your mark.
          </p>
        </div>
        <input
          className="outline-none focus:outline-none focus:ring-2 focus:ring-white rounded-[10px] p-4 bg-ui-1"
          placeholder="Email"
          type="email"
          name="email"
          onChange={(e) => handleChange(e.target.value, setEmail)}
        ></input>
        <input
          className="outline-none focus:outline-none focus:ring-2 focus:ring-white rounded-[10px] p-4 bg-ui-1"
          placeholder="Password"
          type="password"
          name="password"
          onChange={(e) => handleChange(e.target.value, setPassword)}
        ></input>
        <input
          className="outline-none focus:outline-none focus:ring-2 focus:ring-white rounded-[10px] p-4 bg-ui-1"
          placeholder="Confirm password"
          type="password"
          name="confirmPassword"
          onChange={(e) => handleChange(e.target.value, setConfirmPassword)}
        ></input>
        <button className="btn-light" type="submit">
          <span>Sign up</span>
        </button>
        <div className="flex justify-center gap-2 text-sm">
          <span className="text-grey">Already one of us?</span>{" "}
          <Link to={"/login"}>
            <span className="relative hover-underline">Login now</span>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Signup;
