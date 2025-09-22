import Task from '../model/task-model.js';
import StatusMaster from '../model/status-master-model.js';
import messages from '../config/messages.js';

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      attributes: ['id', 'name', 'description', 'status', 'dueDate', 'createdAt', 'updatedAt'],
      where: { deleted: 0 },
      include: [{ model: StatusMaster, attributes: ['code', 'name'], where: { deleted: 0 } }],
    });
    return res.status(200).json({ message: messages.SUCCESS.TASK_RETRIEVED, tasks });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

const getTasksByQuery = async (req, res) => {
  const { status } = req.query;
  try {
    const where = { deleted: 0 };
    if (status) where.status = status;

    const tasks = await Task.findAll({
      attributes: ['id', 'name', 'description', 'status', 'dueDate', 'createdAt', 'updatedAt'],
      where,
      include: [{ model: StatusMaster, attributes: ['code', 'name'], where: { deleted: 0 } }],
    });
    return res.status(200).json({ message: messages.SUCCESS.TASK_RETRIEVED, tasks });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

const getTasksByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const tasks = await Task.findAll({
      attributes: ['id', 'name', 'description', 'status', 'dueDate', 'createdAt', 'updatedAt'],
      where: { status, deleted: 0 },
      include: [{ model: StatusMaster, attributes: ['code', 'name'], where: { deleted: 0 } }],
    });
    if (tasks.length === 0) {
      return res.status(404).json({ message: messages.ERROR.TASK_NOT_FOUND });
    }
    return res.status(200).json({ message: messages.SUCCESS.TASK_RETRIEVED, tasks });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({
      attributes: ['id', 'name', 'description', 'status', 'dueDate', 'createdAt', 'updatedAt'],
      where: { id, deleted: 0 },
      include: [{ model: StatusMaster, attributes: ['code', 'name'], where: { deleted: 0 } }],
    });
    if (!task) {
      return res.status(404).json({ message: messages.ERROR.TASK_NOT_FOUND });
    }
    return res.status(200).json({ message: messages.SUCCESS.TASK_RETRIEVED, task });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

// const createTask = async (req, res) => {
//   const { name, description, due_date } = req.body;

//   if (!name) {
//     return res.status(400).json({ message: messages.ERROR.NAME_REQUIRED });
//   }

//   try {
//     // Validate status if provided, default to TO_DO
//     const status = req.body.status || 'TO_DO';
//     const statusExists = await StatusMaster.findOne({ where: { code: status, deleted: 0 } });
//     if (!statusExists) {
//       return res.status(400).json({ message: messages.ERROR.INVALID_STATUS });
//     }

//     const task = await Task.create({
//       name,
//       description,
//       status,
//       dueDate: due_date,
//       createdBy: req.user.id,
//       deleted: 0,
//     });

//     return res.status(201).json({ message: messages.SUCCESS.TASK_CREATED, task });
//   } catch (error) {
//     return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
//   }
// };

const createTask = async (req, res) => {
  const { name, description, due_date, status } = req.body;

  console.log('Request Body:', req.body); // Log body for debugging

  if (!name) {
    console.log('Missing name field');
    return res.status(400).json({ message: messages.ERROR.NAME_REQUIRED });
  } 

  try {
    // Validate status if provided, default to TO_DO
    const taskStatus = status || 'TO_DO';
    const statusExists = await StatusMaster.findOne({ where: { code: taskStatus, deleted: 0 } });
    if (!statusExists) {
      console.log(`Status ${taskStatus} not found in status_master`);
      return res.status(400).json({ 
        message: messages.ERROR.INVALID_STATUS, 
        details: `Status '${taskStatus}' does not exist. Available statuses: ${await StatusMaster.findAll({ attributes: ['code'], where: { deleted: 0 } }).then(statuses => statuses.map(s => s.code).join(', '))}`
      });
    }

    const task = await Task.create({
      name,
      description,
      status: taskStatus,
      dueDate: due_date,
      createdBy: req.user.id,
      deleted: 0,
    });

    return res.status(201).json({ message: messages.SUCCESS.TASK_CREATED, task });
  } catch (error) {
    console.error('Error creating task:', error.message);
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, status, due_date } = req.body;

  if (!name) {
    return res.status(400).json({ message: messages.ERROR.NAME_REQUIRED });
  }

  try {
    const task = await Task.findOne({ where: { id, deleted: 0 } });
    if (!task) {
      return res.status(404).json({ message: messages.ERROR.TASK_NOT_FOUND });
    }

    // Validate status if provided
    if (status) {
      const statusExists = await StatusMaster.findOne({ where: { code: status, deleted: 0 } });
      if (!statusExists) {
        return res.status(400).json({ message: messages.ERROR.INVALID_STATUS });
      }
    }

    const updateData = {
      name,
      description: description || null,
      status: status || task.status,
      dueDate: due_date || task.dueDate,
      updatedBy: req.user.id,
    };

    await task.update(updateData);
    return res.status(200).json({ message: messages.SUCCESS.TASK_UPDATED, task });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

const patchTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, status, due_date } = req.body;

  try {
    const task = await Task.findOne({ where: { id, deleted: 0 } });
    if (!task) {
      return res.status(404).json({ message: messages.ERROR.TASK_NOT_FOUND });
    }

    // Validate status if provided
    if (status) {
      const statusExists = await StatusMaster.findOne({ where: { code: status, deleted: 0 } });
      if (!statusExists) {
        return res.status(400).json({ message: messages.ERROR.INVALID_STATUS });
      }
    }

    const updateData = { updatedBy: req.user.id };
    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (status) updateData.status = status;
    if (due_date) updateData.dueDate = due_date;

    await task.update(updateData);
    return res.status(200).json({ message: messages.SUCCESS.TASK_UPDATED, task });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ where: { id, deleted: 0 } });
    if (!task) {
      return res.status(404).json({ message: messages.ERROR.TASK_NOT_FOUND });
    }

    await task.update({
      deleted: 1,
      deletedAt: new Date(),
      deletedBy: req.user.id,
    });
    return res.status(200).json({ message: messages.SUCCESS.TASK_DELETED });
  } catch (error) {
    return res.status(500).json({ message: messages.ERROR.SERVER_ERROR, error: error.message });
  }
};

export { getAllTasks, getTasksByQuery, getTasksByStatus, getTaskById, createTask, updateTask, patchTask, deleteTask };