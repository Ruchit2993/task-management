import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const TeamMember = sequelize.define("TeamMember", {
  teamMemberId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    field: "team_member_id",
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1, // 1 = active, 0 = inactive
  },
  statusCode: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: "status_code",   // FK → Status Master(code)
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",       // FK → User(id)
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "task_id",       // FK → Task(id)
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "updated_at",
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "deleted_at",
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "created_by",
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "updated_by",
  },
  deletedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "deleted_by",
  },
}, {
  tableName: "team_member",
  timestamps: true,   
  underscored: true,  
  paranoid: false,    
});

export default TeamMember;

/*
CREATE TABLE IF NOT EXISTS `team_member` (`team_member_id` INTEGER NOT NULL auto_increment , `name` VARCHAR(50) NOT NULL, `desc` TEXT NOT NULL, `status` TINYINT NOT NULL DEFAULT 1, `status_code` VARCHAR(50) NOT NULL, `user_id` INTEGER NOT NULL, `task_id` INTEGER NOT NULL, `created_at` DATETIME, `updated_at` DATETIME, `deleted_at` DATETIME, `created_by` INTEGER, `updated_by` INTEGER, `deleted_by` INTEGER, PRIMARY KEY (`team_member_id`)) ENGINE=InnoDB;
*/