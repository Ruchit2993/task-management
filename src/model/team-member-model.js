import { sequelize } from "../config/dbConnect.js";
import { DataTypes, Model } from "sequelize";

class TeamMember extends Model {}

TeamMember.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedBy: {
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
    modelName: "TeamMember",
    tableName: "team_member",
    timestamps: true,
    underscored: true,
    paranoid: false,
  }
);

// Associations
// TeamMember.belongsTo(User, { foreignKey: "userId" });
// TeamMember.belongsTo(Task, { foreignKey: "taskId" });


export default TeamMember;
/*
CREATE TABLE IF NOT EXISTS `team_member` (`team_member_id` INTEGER NOT NULL auto_increment ,
`name` VARCHAR(50) NOT NULL, `desc` TEXT NOT NULL,
`status` TINYINT NOT NULL DEFAULT 1,
`status_code` VARCHAR(50) NOT NULL,
`user_id` INTEGER NOT NULL,
`task_id` INTEGER NOT NULL, 
`created_at` DATETIME,
`updated_at` DATETIME,
`deleted_at` DATETIME, 
`created_by` INTEGER,
`updated_by` INTEGER,
`deleted_by` INTEGER,
PRIMARY KEY (`team_member_id`)) ENGINE=InnoDB;
*/