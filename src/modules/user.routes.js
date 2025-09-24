import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  patchUser,
  deleteUser
} from "../controllers/user.ontroller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
import { register } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getAllUsers);
router.get("/:id", verifyToken, getUserById);
router.post("/", register); // reuse register from auth
router.put("/:id", verifyToken, isAdmin, updateUser);
router.patch("/:id", verifyToken, isAdmin, patchUser);
router.delete("/:id", verifyToken, isAdmin, deleteUser);

export default router;
