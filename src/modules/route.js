import express from 'express';
import { register, login, changePassword, forgotPassword, resetPassword } from '../controllers/authController.js';
import { getAllUsers, getUserById, updateUser, patchUser, deleteUser } from '../controllers/userController.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/greet', (req, res) => {
    const user = { Greet: 'Hellow..........' };
    return res.status(200).json(user);
});

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/change-pass', verifyToken, changePassword);
router.post('/auth/forgot-pass', forgotPassword);
router.post('/auth/reset-pass', resetPassword);

router.get('/users/getall', verifyToken, isAdmin, getAllUsers);
router.get('/users/:id', verifyToken, getUserById);
router.post('/users', register); // Reuse auth register
router.put('/users/:id', verifyToken, isAdmin, updateUser);
router.patch('/users/:id', verifyToken, isAdmin, patchUser);
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);

export default router;