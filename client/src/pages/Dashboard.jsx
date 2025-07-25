import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { toast, Toaster } from "sonner";
import { useStore } from "../stores/auth.store";
import Loader from "../components/Loader";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await api.post("/api/logout");
      if (response.status === 200) {
        navigate("/login");
      } else {
        console.log("Failed to log out.");
        toast.error("Failed to log out.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid place-items-center h-dvh text-center">
      <section className="flex flex-col gap-4">
        {isLoading ? <Loader /> : <></>}
        <Toaster />
        <div className="flex flex-col gap-1">
          <p className="text-h5">DGLN Dashboard</p>
          <p>Welcome, {user.data.email}!</p>
        </div>
        <hr />
        <button onClick={handleLogout} type="button">
          <span className="cursor-pointer relative hover-underline">
            Logout
          </span>
        </button>
      </section>
    </div>
  );
};

export default Dashboard;
