import StatusMaster from '../model/status-master-model.js';
import messages from '../config/messages.js';

const getAllStatuses = async (req, res) => {
  try {
    const statuses = await StatusMaster.findAll({
      attributes: ['id', 'code', 'name', 'status', 'createdAt', 'updatedAt'],
      where: { deleted: 0 },
    });
    return res.status(200).json({ message: messages.SUCCESS.STATUS_RETRIEVED, statuses });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

const getStatusByCode = async (req, res) => {
  const { code } = req.params;

  try {
    const status = await StatusMaster.findOne({
      attributes: ['id', 'code', 'name', 'status', 'createdAt', 'updatedAt'],
      where: { code, deleted: 0 },
    });

    if (!status) {
      return res.status(404).json({ message: messages.ERROR.STATUS_NOT_FOUND });
    }

    return res.status(200).json({ message: messages.SUCCESS.STATUS_RETRIEVED, status });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

const createStatus = async (req, res) => {
  const { code, name } = req.body;

  if (!code || !name) {
    return res.status(400).json({ message: messages.ERROR.CODE_NAME_REQUIRED });
  }

  try {
    const existingStatus = await StatusMaster.findOne({ where: { code, deleted: 0 } });
    if (existingStatus) {
      return res.status(400).json({ message: messages.ERROR.CODE_EXISTS });
    }

    const status = await StatusMaster.create({
      code,
      name,
      status: 1,
      createdBy: req.user.id,
      deleted: 0,
    });

    return res.status(201).json({ message: messages.SUCCESS.STATUS_CREATED, status });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

const updateStatus = async (req, res) => {
  const { code } = req.params;
  const { code: newCode, name, status } = req.body;

  if (!newCode || !name) {
    return res.status(400).json({ message: messages.ERROR.CODE_NAME_REQUIRED });
  }

  try {
    const existingStatus = await StatusMaster.findOne({ where: { code, deleted: 0 } });
    if (!existingStatus) {
      return res.status(404).json({ message: messages.ERROR.STATUS_NOT_FOUND });
    }

    const updateData = {
      code: newCode,
      name,
      status: status !== undefined ? status : existingStatus.status,
      updatedBy: req.user.id,
    };

    await existingStatus.update(updateData);
    return res.status(200).json({ message: messages.SUCCESS.STATUS_UPDATED, status: existingStatus });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

const patchStatus = async (req, res) => {
  const { code } = req.params;
  const { code: newCode, name, status } = req.body;

  try {
    const existingStatus = await StatusMaster.findOne({ where: { code, deleted: 0 } });
    if (!existingStatus) {
      return res.status(404).json({ message: messages.ERROR.STATUS_NOT_FOUND });
    }

    const updateData = { updatedBy: req.user.id };
    if (newCode) updateData.code = newCode;
    if (name) updateData.name = name;
    if (status !== undefined) updateData.status = status;

    await existingStatus.update(updateData);
    return res.status(200).json({ message: messages.SUCCESS.STATUS_UPDATED, status: existingStatus });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

const deleteStatus = async (req, res) => {
  const { code } = req.params;

  try {
    const status = await StatusMaster.findOne({ where: { code, deleted: 0 } });
    if (!status) {
      return res.status(404).json({ message: messages.ERROR.STATUS_NOT_FOUND });
    }

    await status.update({
      status: 0,
      deleted: 1,
      deletedAt: new Date(),
      deletedBy: req.user.id,
    });
    return res.status(200).json({ message: messages.SUCCESS.STATUS_DELETED });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

export { getAllStatuses, getStatusByCode, createStatus, updateStatus, patchStatus, deleteStatus };