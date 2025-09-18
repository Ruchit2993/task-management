import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user-model.js';
import messages from '../config/messages.js';

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        // { expiresIn: '1h' }
    );
};

const register = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: messages.ERROR.REQ_BODY_ERR });
    }

    const { name, email, contact, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: messages.ERROR.NAME_EMAIL_PASS_REQUIRED });
    }

    try {
        // Check for existing email
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: messages.ERROR.EMAIL_EXISTS });
        }

        // Check for existing contact if provided
        if (contact) {
            const existingContact = await User.findOne({ where: { contact } });
            if (existingContact) {
                return res.status(400).json({ message: 'Contact already exists' });
            }
        }

        const userCount = await User.count();
        const isAdmin = userCount === 0 ? 1 : 0; // First user is admin
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            contact,
            password: hashedPassword,
            isAdmin,
            isFirstLogin: 1 // Must change password
        });

        const token = generateToken(user);
        return res.status(201).json({
            message: messages.SUCCESS.USER_REGISTERED,
            userId: user.id,
            token
        });
    } catch (error) {
        return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
    }
};

const login = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: messages.ERROR.REQ_BODY_ERR });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: messages.ERROR.REQ_EM_PASS });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: messages.ERROR.INVALID_EM_PASS });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: messages.ERROR.INVALID_EM_PASS });
        }

        if (user.isFirstLogin) {
            return res.status(403).json({ message: messages.INFO.CHANGE_PASS });
        }

        const token = generateToken(user);
        return res.status(200).json({ message: messages.SUCCESS.LOGIN_SUCCESS, token });
    } catch (error) {
        return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
    }
};

const changePassword = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: messages.INFO.REQ_BODY });
    }

    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.id;

    if (!newPassword || !confirmPassword) {
        return res.status(400).json({ message: messages.INFO.NEWPASS_CONFPASS });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: messages.ERROR.PASSWORD_NOT_MATCH });
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: messages.ERROR.USER_NOT_FOUND });
        }

        if (oldPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: messages.ERROR.INVALID_OLD_PASS });
            }
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedPassword, isFirstLogin: 0 });

        return res.status(200).json({ message: messages.SUCCESS.PASSWORD_CHANGED });
    } catch (error) {
        return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
    }
};

const forgotPassword = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: messages.ERROR.REQ_BODY_ERR });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: messages.ERROR.VALIDATION_ERROR });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: messages.ERROR.USER_NOT_FOUND });
        }

        return res.status(200).json({ message: messages.INFO.REDIRECT_CHANGE_PASS });
    } catch (error) {
        return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
    }
};

const resetPassword = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: messages.ERROR.REQ_BODY_ERR });
    }

    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: messages.ERROR.VALIDATION_ERROR });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: messages.ERROR.PASSWORD_NOT_MATCH });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: messages.ERROR.USER_NOT_FOUND });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedPassword, isFirstLogin: 0 });

        return res.status(200).json({ message: messages.SUCCESS.PASSWORD_RESET });
    } catch (error) {
        return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
    }
};

export { register, login, changePassword, forgotPassword, resetPassword };
