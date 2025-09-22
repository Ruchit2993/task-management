import dotenv from 'dotenv';
import express from 'express';
import { sequelize, testConnection } from '../config/dbConnect.js';
import requestLogger from "../middlewares/requestLogger.js"
import router from '../modules/route.js'
// import User from '../model/user-model.js';
// import Task from '../model/task-model.js';
// import StatusMaster from '../model/status-master-model.js';
// import TeamMember from '../model/team-member-model.js';
dotenv.config();

const PORT = process.env.PORT
const app = express();

app.use(express.json())
app.use('/',requestLogger, router);

testConnection();

// User.sync({ force: true });
// Task.sync({ force: true });
// StatusMaster.sync({alter: true});
// TeamMember.sync({force: true});


// await sequelize.sync({force: true}); 
await sequelize.sync({alter: true}); 

console.log(process.env.JWT_SECRET)


app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
});
