import express from "express";
import { getEmployeesWithCompany, getEmployeeById } from "../controllers/employee-controller.js";

const employeeRouter = express.Router();

employeeRouter.get("/", getEmployeesWithCompany);
employeeRouter.get("/:id", getEmployeeById);

export default employeeRouter;
