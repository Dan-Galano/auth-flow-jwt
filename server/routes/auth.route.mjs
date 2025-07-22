import express from "express";
import {
  fetchUsers,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.mjs";
const router = express.Router();

router.get("/users", fetchUsers);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
