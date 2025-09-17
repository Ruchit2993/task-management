import express from "express";
import { getCompaniesWithEmployees, getCompanyById } from "../controllers/company-controller.js";

const companyRouter = express.Router();

companyRouter.get("/", getCompaniesWithEmployees);
companyRouter.get("/:id", getCompanyById);

export default companyRouter;
