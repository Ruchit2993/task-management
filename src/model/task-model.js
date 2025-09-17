import { sequelize } from "../config/dbConnect.js";
import { DataTypes, Model } from "sequelize";

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  // FK to Status Master
  statusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  statusCode: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // Basic task details
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // Task assignments
  assignedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  assignedTo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  // Metadata
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  deletedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: "tasks",
  timestamps: true,     // enables createdAt & updatedAt
  underscored: true,    // snake_case columns
  paranoid: false,      // you already have deleted_at
});

export default Task;

/*
 CREATE TABLE IF NOT EXISTS `tasks` (`id` INTEGER NOT NULL auto_increment , `status_id` INTEGER NOT NULL, `status_code` VARCHAR(50) NOT NULL, `name` VARCHAR(100) NOT NULL, `description` TEXT, `assigned_by` INTEGER, `assigned_to` INTEGER, `due_date` DATETIME, `created_at` DATETIME, `updated_at` DATETIME, `deleted_at` DATETIME, `created_by` INTEGER, `updated_by` INTEGER, `deleted_by` INTEGER, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `tasks`
*/