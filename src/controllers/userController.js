import User from '../model/user-model.js';
import messages from '../config/messages.js';
import bcrypt from 'bcrypt';

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'contact', 'isAdmin', 'isFirstLogin', 'status', 'createdAt', 'updatedAt'],
            where: { status: 1 } // Only active users
        });
        return res.status(200).json({ message: messages.SUCCESS.USER_RETRIEVED, users });
    } catch (error) {
        return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({
            attributes: ['id', 'name', 'email', 'contact', 'isAdmin', 'isFirstLogin', 'status', 'createdAt', 'updatedAt'],
            where: { id, status: 1 }
        });

        if (!user) {
            return res.status(404).json({ message: messages.ERROR.USER_NOT_FOUND });
        }

        return res.status(200).json({ message: messages.SUCCESS.USER_RETRIEVED, user });
    } catch (error) {
        return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, contact, password } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: messages.ERROR.NAME_EMAIL_PASS_REQUIRED });
    }

    try {
        const user = await User.findByPk(id);
        if (!user || user.status === 0) {
            return res.status(404).json({ message: messages.ERROR.USER_NOT_FOUND });
        }

        const updateData = {
            name,
            email,
            contact: contact || null,
            updatedAt: new Date(),
            updatedBy: req.user.id
        };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await user.update(updateData);
        return res.status(200).json({ message: messages.SUCCESS.USER_UPDATED, user });
    } catch (error) {
        return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
    }
};

const patchUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, contact, password } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user || user.status === 0) {
            return res.status(404).json({ message: messages.ERROR.USER_NOT_FOUND });
        }

        const updateData = { updatedAt: new Date(), updatedBy: req.user.id };
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (contact) updateData.contact = contact;
        if (password) updateData.password = await bcrypt.hash(password, 10);

        await user.update(updateData);
        return res.status(200).json({ message: messages.SUCCESS.USER_UPDATED, user });
    } catch (error) {
        return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user || user.status === 0) {
            return res.status(404).json({ message: messages.ERROR.USER_NOT_FOUND });
        }

        await user.update({
            status: 0,
            deletedAt: new Date(),
            deletedBy: req.user.id
        });
        return res.status(200).json({ message: messages.SUCCESS.USER_DELETED });
    } catch (error) {
        return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
    }
};

export { getAllUsers, getUserById, updateUser, patchUser, deleteUser };