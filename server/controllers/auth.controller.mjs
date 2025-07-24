import User from "../models/user.model.mjs";
import jwt from "jsonwebtoken";

export const fetchUser = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

export const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    if (!user) {
      return res.status(500).json({ message: "Failed to create user." });
    }

    const refreshToken = createRefreshToken({
      id: user._id,
      email: user.email,
    });

    const accessToken = createAccessToken({
      id: user._id,
      email: user.email,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    console.log({ user });

    res.status(201).json({ accessToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const refreshToken = createRefreshToken({
      id: user._id,
      email: user.email,
    });

    const accessToken = createAccessToken({
      id: user._id,
      email: user.email,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({ user: user._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  res.cookie("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  res
    .status(200)
    .json({ message: "Logged out successfully", isLoggedOut: true });
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "No refresh token provided" });
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    (error, decodedToken) => {
      if (error) {
        console.log("Token error:", error);
        return res
          .status(400)
          .json({ message: "Invalid or expired refresh token." });
      }

      if (!decodedToken || !decodedToken.email || !decodedToken.id) {
        return res.status(401).json({ message: "Invalid refresh token data" });
      }

      const newAccessToken = jwt.sign(
        {
          id: decodedToken.id,
          email: decodedToken.email,
        },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secre: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.json({ accessToken: newAccessToken });
    }
  );
};
