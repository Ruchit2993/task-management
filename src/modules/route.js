import express from "express";
import { verifyToken, isAdmin } from '../middlewares/auth.middleware.js';
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import statusRoutes from "./status.routes.js";
import taskRoutes from "./task.routes.js";

const router = express.Router();

router.get("/greet", (req, res) => {
  res.json({ Greet: "Hello.........." });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/status", statusRoutes);
router.use("/tasks", taskRoutes);

export default router;
