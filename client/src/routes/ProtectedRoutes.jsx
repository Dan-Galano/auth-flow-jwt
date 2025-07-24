import React from "react";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserFromCookie, refreshToken } from "../utils/cookie";
import { useStore } from "../stores/auth.store.js";
import { useState } from "react";

const ProtectedRoutes = () => {
  let user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let user = await getUserFromCookie();

      if (!user) {
        const newToken = await refreshToken();
        if (newToken) {
          user = await getUserFromCookie();
        }
      }
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return null;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
