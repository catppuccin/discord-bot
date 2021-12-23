import Sequelize from "sequelize"
const { DataTypes } = Sequelize
import Utils from "../modules/utils.js"

export const Member = Utils.db.define('member', {
  discord: DataTypes.STRING,
  points: DataTypes.NUMBER,
  wins: DataTypes.NUMBER,
  losses: DataTypes.NUMBER,
  reps: DataTypes.NUMBER,
})