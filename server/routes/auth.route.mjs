import express from "express";
import {
  fetchUsers,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.mjs";
import { recaptcha } from "../middlewares/recaptcha.mjs";

const router = express.Router();

router.get("/users", fetchUsers);
router.post("/signup", recaptcha, signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
