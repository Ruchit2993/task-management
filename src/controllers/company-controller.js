import { Sequelize } from "sequelize";
import { sequelize } from "../config/dbConnect.js";
import { Company } from "../model/company-model.js";
import { Employee } from "../model/employee-model.js";

// const getCompaniesWithEmployees = async (req, res) => {
//   try {
//     const companies = await Company.findAll({
//       include: [{ 
//         model: Employee 
//       }],
//     });
//     res.json(companies);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


const getCompaniesWithEmployees = async (req, res) => {
  try {
    const companies = await Company.findAll({
      attributes: [
        "id",
        "cmpname",
        "status",
        [Sequelize.col("emp.id"),"empid"],
        [Sequelize.col("emp.empName"),"empName"]
      ],
      include: [{
        model: Employee,
        as: "emp",
        attributes: []
      }],
    });
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id, {
      include: [{
        model: Employee
      }],
    });

    if (!company) return res.status(404).json({ error: "Company not found" });

    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getCompaniesWithEmployees, getCompanyById }