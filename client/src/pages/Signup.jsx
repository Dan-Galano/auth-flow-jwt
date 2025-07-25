import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { Toaster, toast } from "sonner";
import api from "../utils/axios.js";
import Loader from "../components/Loader.jsx";

const Form = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (value, setValue) => {
    setValue(value);
  };

  const submitRegistration = async (recaptchaToken) => {
    const response = await api.post("/api/signup", {
      email,
      password,
      recaptchaToken,
    });
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      toast.error("reCAPTCHA is not ready.");
      return;
    }

    if (!email || !password || !confirmPassword) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const recaptchaToken = await executeRecaptcha("signup");
      const responseRegister = await submitRegistration(recaptchaToken);
      console.log(responseRegister);
      toast.success("Account registered.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-12 outline-1 gap-5 rounded-lg text-center"
    >
      {isLoading ? <Loader /> : <></>}
      <div className="flex flex-col gap-1">
        <p className="text-h5">Forge Your Identity</p>
        <p className="text-md text-grey">Enter the realm — leave your mark.</p>
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
  );
};

const Signup = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
    >
      <section className="flex flex-col justify-center items-center h-dvh">
        <Toaster />
        <Form />
        <div className="pt-4 text-sm text-grey ">
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

export default Signup;
