import express from "express";
import {
  fetchUser,
  refreshToken,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.mjs";
import verifyToken from "../middlewares/verify.token.mjs";
import { recaptcha } from "../middlewares/recaptcha.mjs";

const router = express.Router();

router.get("/user-info", verifyToken, fetchUser);
router.get("/refresh-token", refreshToken);
router.post("/signup", recaptcha, signup);
router.post("/login", recaptcha, login);
router.post("/logout", logout);


export default router;
