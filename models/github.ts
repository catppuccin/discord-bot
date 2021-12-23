import Sequelize from "sequelize"
const { DataTypes } = Sequelize
import Utils from "../modules/utils.js"

export const Github = Utils.db.define('github', {
  name: DataTypes.STRING,
  full_name: DataTypes.STRING,
  link: DataTypes.STRING,
  stars: DataTypes.NUMBER,
  forks: DataTypes.NUMBER,
  issues: DataTypes.NUMBER
})
