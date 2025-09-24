import express from "express";
import {
  register,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
  firstChangePassword
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/change-pass", verifyToken, changePassword);
router.post("/first-change-pass", verifyToken, firstChangePassword);
router.post("/forgot-pass", forgotPassword);
router.post("/reset-pass", resetPassword);

export default router;
