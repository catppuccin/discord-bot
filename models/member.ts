import Sequelize from "sequelize"
const { Model, DataTypes } = Sequelize
import Utils from "../modules/utils.js"

// export default class Member extends Model {}

// Member.init({
//   id: DataTypes.STRING,
//   points: DataTypes.NUMBER,
//   wins: DataTypes.NUMBER,
//   losses: DataTypes.NUMBER
// }, { 
//   sequelize: Utils.db,
//   modelName: 'member' 
// })

export const Github = Utils.db.define('member', {
  id: DataTypes.STRING,
  points: DataTypes.NUMBER,
  wins: DataTypes.NUMBER,
  losses: DataTypes.NUMBER
})

//db.close()