import { sequelize } from "../config/dbConnect.js";
import { DataTypes, Model } from "sequelize";

const User = sequelize.define("User", {
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
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    // unique: true,
  },
  contact: {
    type: DataTypes.STRING(12),
    allowNull: true,
    // unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
  },
  isFirstLogin: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
  },
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
  tableName: "users",   // table name in DB
  timestamps: true,    // we’re handling timestamps manually
  underscored: true,    // match snake_case columns
  paranoid: false,      // you already have deleted_at handling
  indexes: [
    { unique: true, fields: ["email"] },
    { unique: true, fields: ["contact"] }
  ]
});

export default User;

/*CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , 
`name` VARCHAR(50) NOT NULL,
`email` VARCHAR(50) NOT NULL UNIQUE, 
`contact` VARCHAR(12) UNIQUE, 
`password` VARCHAR(255) NOT NULL, 
`is_admin` TINYINT NOT NULL DEFAULT 1, 
`is_first_login` TINYINT NOT NULL DEFAULT 0,
`status` TINYINT NOT NULL DEFAULT 1, 
`created_at` DATETIME,
`updated_at` DATETIME,
`deleted_at` DATETIME,
`created_by` INTEGER, 
`updated_by` INTEGER, 
`deleted_by` INTEGER,
PRIMARY KEY (`id`)) ENGINE=InnoDB;
SHOW INDEX FROM `users`
*/
