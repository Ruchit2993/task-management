import express from 'express';
import { register, login, changePassword, forgotPassword, resetPassword, firstChangePassword } from '../controllers/authController.js';
import { getAllUsers, getUserById, updateUser, patchUser, deleteUser } from '../controllers/userController.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';
import { getAllStatuses, getStatusByCode, createStatus, updateStatus, patchStatus, deleteStatus } from '../controllers/statusMasterController.js';
import {getAllTasks,getTasksByQuery,getTasksByStatus,getTaskById,createTask,updateTask,patchTask,deleteTask} from '../controllers/taskController.js';
const router = express.Router();

router.get('/greet', (req, res) => {
    const user = { Greet: 'Hellow..........' };
    return res.status(200).json(user);
});

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/change-pass', verifyToken, changePassword);
router.post('/auth/first-change-pass', verifyToken, firstChangePassword);
router.post('/auth/forgot-pass', forgotPassword);
router.post('/auth/reset-pass', resetPassword);

router.get('/users', verifyToken, isAdmin, getAllUsers);
router.get('/users/:id', verifyToken, getUserById);
router.post('/users', register); // Reuse auth register
router.put('/users/:id', verifyToken, isAdmin, updateUser);
router.patch('/users/:id', verifyToken, isAdmin, patchUser);
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);


// StatusMaster Routes
router.get('/status', verifyToken, getAllStatuses);
router.get('/status/:code', verifyToken, getStatusByCode);
router.post('/status', verifyToken, isAdmin, createStatus);
router.put('/status/:code', verifyToken, isAdmin, updateStatus);
router.patch('/status/:code', verifyToken, isAdmin, patchStatus);
router.delete('/status/:code', verifyToken, isAdmin, deleteStatus);

// Task Routes
router.get('/tasks', verifyToken, getAllTasks);
router.get('/task', verifyToken, getTasksByQuery); // Query-based filtering
router.get('/task/:status', verifyToken, getTasksByStatus);
router.get('/tasks/:id', verifyToken, getTaskById);
router.post('/tasks', verifyToken, isAdmin, createTask);
router.put('/tasks/:id', verifyToken, isAdmin, updateTask);
router.patch('/tasks/:id', verifyToken, isAdmin, patchTask);
router.delete('/tasks/:id', verifyToken, isAdmin, deleteTask);

export default router;