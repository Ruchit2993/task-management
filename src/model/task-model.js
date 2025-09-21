import { sequelize } from "../config/dbConnect.js";
import { DataTypes, Model } from "sequelize";

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
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
    deleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: true,
    underscored: true,
    paranoid: false,
  }
);

// Task.belongsTo(StatusMaster, { foreignKey: "status", targetKey: "code" });
// Task.hasMany(TeamMember, { foreignKey: "taskId" });
// Task.belongsTo(User, { foreignKey: "createdBy", as: "creator" });
// Task.belongsTo(User, { foreignKey: "updatedBy", as: "updater" });
// Task.belongsTo(User, { foreignKey: "deletedBy", as: "deleter" });

export default Task;

/*
 CREATE TABLE IF NOT EXISTS `tasks` (`id` INTEGER NOT NULL auto_increment ,
`status_id` INTEGER NOT NULL,
`status_code` VARCHAR(50) NOT NULL, 
`name` VARCHAR(100) NOT NULL, 
`description` TEXT, 
`assigned_by` INTEGER,
`assigned_to` INTEGER, 
`due_date` DATETIME,
`created_at` DATETIME, 
`updated_at` DATETIME, 
`deleted_at` DATETIME,
`created_by` INTEGER,
`updated_by` INTEGER,
`deleted_by` INTEGER,
PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `tasks`
*/