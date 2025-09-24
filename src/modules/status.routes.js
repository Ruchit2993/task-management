import express from "express";
import {
  getAllStatuses,
  getStatusByCode,
  createStatus,
  updateStatus,
  patchStatus,
  deleteStatus
} from "../controllers/status-master.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllStatuses);
router.get("/:code", verifyToken, getStatusByCode);
router.post("/", verifyToken, isAdmin, createStatus);
router.put("/:code", verifyToken, isAdmin, updateStatus);
router.patch("/:code", verifyToken, isAdmin, patchStatus);
router.delete("/:code", verifyToken, isAdmin, deleteStatus);

export default router;
