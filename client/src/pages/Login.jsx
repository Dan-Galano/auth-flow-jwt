import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import api from "../utils/axios";
import { Toaster, toast } from "sonner";
import { useEffect } from "react";
import { getUserFromCookie } from "../utils/cookie";

const Form = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleValueChange = (value, setValue) => {
    setValue(value);
  };

  const login = async (recaptchaToken) => {
    const response = await api.post("/api/login", {
      email,
      password,
      recaptchaToken,
    });

    return response;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      toast.error("reCAPTCHA is not ready.");
      return;
    }

    if (!email || !password) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      const recaptchaToken = await executeRecaptcha("login");
      console.log("got here");

      const responseLogin = await login(recaptchaToken);
      console.log(responseLogin.data);
      console.log("Logged in!");
      toast.success("Logged in!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed.", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col p-12 outline-1 gap-5 rounded-lg text-center"
    >
      <div className="flex flex-col gap-1">
        <p className="text-h5">Enter the Portal</p>
        <p className="text-md text-grey">Prove your worth to step inside.</p>
      </div>
      <input
        className="outline-none focus:outline-none focus:ring-2 focus:ring-white rounded-[10px] p-4 bg-ui-1"
        placeholder="Email"
        type="email"
        name="email"
        onChange={(e) => handleValueChange(e.target.value, setEmail)}
      ></input>
      <input
        className="outline-none focus:outline-none focus:ring-2 focus:ring-white rounded-[10px] p-4 bg-ui-1"
        placeholder="Password"
        type="password"
        name="password"
        onChange={(e) => handleValueChange(e.target.value, setPassword)}
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
  );
};

const Login = () => {
  const navigate = useNavigate();

  const fetchUser = async () => {
    const user = await getUserFromCookie();
    if (user) navigate("/dashboard");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
    >
      <section className="flex flex-col justify-center items-center h-dvh">
        <Toaster />
        <Form />
        <div className="pt-5 text-sm text-grey ">
          <Link to={"/"}>
            <span className="transition-all ease-in-out duration-300 hover:text-white">
              Return Home
            </span>
          </Link>
        </div>
      </section>
    </GoogleReCaptchaProvider>
  );
};

export default Login;
