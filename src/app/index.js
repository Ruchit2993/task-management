// import dotenv from 'dotenv';
import express from 'express';
import { sequelize, testConnection } from '../config/dbConnect.js';
import requestLogger from "../middlewares/requestLogger.js"
import router from '../modules/route.js'
import User from '../model/user-model.js';
import Task from '../model/task-model.js';
import StatusMaster from '../model/status-master-model.js';
import TeamMember from '../model/team-member-model.js';
import { Sequelize } from 'sequelize';
// dotenv.config();

const PORT = process.env.PORT
const app = express();
app.use('/',requestLogger, router);

testConnection();

// User.sync({ force: true });
// Task.sync({ force: true });
// StatusMaster.sync({force: true});
// TeamMember.sync({force: true});


await sequelize.sync({ alter: true }); 

await User.bulkCreate([
  {
    name: "Ruchit Pitaliya",
    email: "ruchit@example.com",
    contact: "9876543210",
    password: "hashedPassword123",
    isAdmin: 1,
    isFirstLogin: 0,
    status: 1,
    createdBy: null,
  },
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    contact: "9123456789",
    password: "hashedPassword456",
    isAdmin: 0,
    isFirstLogin: 1,
    status: 1,
    createdBy: 1,
  },
  {
    name: "Amit Verma",
    email: "amit@example.com",
    contact: "9988776655",
    password: "hashedPassword789",
    isAdmin: 0,
    isFirstLogin: 0,
    status: 1,
    createdBy: 1,
  },
]);

await StatusMaster.bulkCreate([
  { code: "TO_DO", statusName: "To Do", status: 1, createdBy: 1 },
  { code: "IN_PROGRESS", statusName: "In Progress", status: 1, createdBy: 1 },
  { code: "COMPLETED", statusName: "Completed", status: 1, createdBy: 1 },
  { code: "ON_HOLD", statusName: "On Hold", status: 1, createdBy: 1 },
  { code: "APPROVE", statusName: "Approved", status: 1, createdBy: 1 },
]);

await Task.bulkCreate([
  {
    name: "Build Login API",
    description: "Create user login and JWT authentication",
    statusId: 1, // TO_DO
    statusCode: "TO_DO",
    assignedBy: 1,
    assignedTo: 2,
    dueDate: "2025-09-30",
    createdBy: 1,
  },
  {
    name: "Task Management UI",
    description: "Frontend for task listing and filtering",
    statusId: 2, // IN_PROGRESS
    statusCode: "IN_PROGRESS",
    assignedBy: 1,
    assignedTo: 3,
    dueDate: "2025-10-05",
    createdBy: 1,
  },
  {
    name: "Database Schema Design",
    description: "Finalize schema for users, tasks, and team members",
    statusId: 3, // COMPLETED
    statusCode: "COMPLETED",
    assignedBy: 1,
    assignedTo: 2,
    dueDate: "2025-09-15",
    createdBy: 1,
  },
]);

await TeamMember.bulkCreate([
  {
    name: "Ruchit Pitaliya",
    desc: "Lead developer for API",
    status: 1,
    statusCode: "IN_PROGRESS",
    userId: 1,  // User Ruchit
    taskId: 1,  // Task "Build Login API"
    createdBy: 1,
  },
  {
    name: "Priya Sharma",
    desc: "Frontend developer for UI",
    status: 1,
    statusCode: "TO_DO",
    userId: 2,  // User Priya
    taskId: 2,  // Task "Task Management UI"
    createdBy: 1,
  },
  {
    name: "Amit Verma",
    desc: "Database design specialist",
    status: 1,
    statusCode: "COMPLETED",
    userId: 3,  // User Amit
    taskId: 3,  // Task "Database Schema Design"
    createdBy: 1,
  },
]);

app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
});
