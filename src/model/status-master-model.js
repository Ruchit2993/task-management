import { sequelize } from "../config/dbConnect.js";
import { DataTypes, Model } from "sequelize";

const StatusMaster = sequelize.define("StatusMaster", {
  statusId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    field: "status_id",
  },
  code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: "TO_DO",   // default value from dictionary
  },
  statusName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: "to_do",
    field: "status_name",
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: 1,   // 1 = active, 0 = inactive
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
  tableName: "status_master",
  timestamps: true,    // enables createdAt & updatedAt
  underscored: true,   // snake_case column names
  paranoid: false,     // manual deleted_at
});

export default StatusMaster;

/*
Executing (default): CREATE TABLE IF NOT EXISTS `status_master` (`status_id` INTEGER NOT NULL auto_increment ,
`code` VARCHAR(50) NOT NULL DEFAULT 'TO_DO',
`status_name` VARCHAR(50) NOT NULL DEFAULT 'to_do',
`status` TINYINT DEFAULT 1,
`created_at` DATETIME,
`updated_at` DATETIME,
`deleted_at` DATETIME,
`created_by` INTEGER,
`updated_by` INTEGER,
`deleted_by` INTEGER, 
PRIMARY KEY (`status_id`)) ENGINE=InnoDB;
*/