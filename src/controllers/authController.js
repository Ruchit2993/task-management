import User from '../model/user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import messages from '../config/messages.js';

const register = async (req, res) => {
  const { name, email, contact, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: messages.ERROR.NAME_EMAIL_PASS_REQUIRED });
  }

  try {
    const existingUser = await User.findOne({ where: { email, deleted: 0 } });
    if (existingUser) {
      return res.status(400).json({ message: messages.ERROR.EMAIL_EXISTS });
    }

    const existingContact = contact ? await User.findOne({ where: { contact, deleted: 0 } }) : null;
    if (existingContact) {
      return res.status(400).json({ message: messages.ERROR.CONTACT_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      contact,
      password: hashedPassword,
      isFirstLogin: 1,
      isAdmin: 0,
      status: 1,
      deleted: 0,
    });

    return res.status(201).json({ message: messages.SUCCESS.USER_REGISTERED });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: messages.ERROR.REQ_EM_PASS });
  }

  try {
    const user = await User.findOne({ where: { email, deleted: 0 } });
    if (!user) {
      return res.status(401).json({ message: messages.ERROR.INVALID_EM_PASS });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: messages.ERROR.INVALID_EM_PASS });
    }

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'task_management_secret',
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: messages.SUCCESS.LOGIN_SUCCESS,
      token,
      isFirstLogin: user.isFirstLogin,
    });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: messages.ERROR.NEWPASS_CONFPASS });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: messages.ERROR.PASSWORD_NOT_MATCH });
  }

  try {
    const user = await User.findOne({ where: { id: req.user.id, deleted: 0 } });
    if (!user) {
      return res.status(404).json({ message: messages.ERROR.USER_NOT_FOUND });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: messages.ERROR.INVALID_OLD_PASS });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({
      password: hashedPassword,
      isFirstLogin: 0,
      updatedAt: new Date(),
      updatedBy: req.user.id,
    });

    return res.status(200).json({ message: messages.SUCCESS.PASSWORD_CHANGED });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

const firstChangePassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({ message: messages.ERROR.NEWPASS_CONFPASS });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: messages.ERROR.PASSWORD_NOT_MATCH });
  }

  try {
    const user = await User.findOne({ where: { id: req.user.id, deleted: 0 } });
    if (!user) {
      return res.status(404).json({ message: messages.ERROR.USER_NOT_FOUND });
    }

    if (!user.isFirstLogin) {
      return res.status(400).json({ message: messages.ERROR.NOT_FIRST_LOGIN });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({
      password: hashedPassword,
      isFirstLogin: 0,
      updatedAt: new Date(),
      updatedBy: req.user.id,
    });

    return res.status(200).json({ message: messages.SUCCESS.PASSWORD_CHANGED });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: messages.ERROR.REQ_EM_PASS });
  }

  try {
    const user = await User.findOne({ where: { email, deleted: 0 } });
    if (!user) {
      return res.status(404).json({ message: messages.ERROR.USER_NOT_FOUND });
    }

    return res.status(200).json({ message: messages.INFO.REDIRECT_CHANGE_PASS });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: messages.ERROR.REQ_EM_PASS });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: messages.ERROR.PASSWORD_NOT_MATCH });
  }

  try {
    const user = await User.findOne({ where: { email, deleted: 0 } });
    if (!user) {
      return res.status(404).json({ message: messages.ERROR.USER_NOT_FOUND });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({
      password: hashedPassword,
      isFirstLogin: 0,
      updatedAt: new Date(),
    });

    return res.status(200).json({ message: messages.SUCCESS.PASSWORD_RESET });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

export { register, login, changePassword, firstChangePassword, forgotPassword, resetPassword };