import Sequelize from "sequelize"
const { Model, DataTypes } = Sequelize
import Utils from "../modules/utils.js"

// export default class Github extends Model {}

// Github.init({
//   name: DataTypes.STRING,
//   link: DataTypes.STRING,
//   stars: DataTypes.NUMBER,
//   forks: DataTypes.NUMBER,
//   issues: DataTypes.NUMBER
// }, { 
//   sequelize: Utils.db,
//   modelName: 'github' 
// })

export const Github = Utils.db.define('github', {
  name: DataTypes.STRING,
  full_name: DataTypes.STRING,
  link: DataTypes.STRING,
  stars: DataTypes.NUMBER,
  forks: DataTypes.NUMBER,
  issues: DataTypes.NUMBER
})
