import express from "express";
import authRoutes from "../modules/auth/route/auth.routes.js";
import userRoutes from "../modules/user/route/user.routes.js";
import statusRoutes from "../modules/status-master/route/status.routes.js";
import taskRoutes from "../modules/task/route/task.routes.js";

const router = express.Router();

router.get("/greet", (req, res) => {
  res.json({ Greet: "Hello.........." });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/status", statusRoutes);
router.use("/tasks", taskRoutes);

export default router;
