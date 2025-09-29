import express from "express";
import {
  getAllTasks,
//   getTasksByQuery,
  getTasksByStatus,
  getTaskById,
  createTask,
  updateTask,
  patchTask,
  deleteTask
} from "../controllers/task.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllTasks);
// router.get("/", verifyToken, getTasksByQuery); // this Route is for Query-based filtering done in the above route    
router.get("/status/:status", verifyToken, getTasksByStatus);
router.get("/:id", verifyToken, getTaskById);

router.post("/", verifyToken, isAdmin, createTask);
router.put("/:id", verifyToken, isAdmin, updateTask);
router.patch("/:id", verifyToken, patchTask);
router.delete("/:id", verifyToken, isAdmin, deleteTask);



export default router;
