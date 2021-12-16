import Sequelize from "sequelize"
const { DataTypes } = Sequelize
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

export const Member = Utils.db.define('member', {
  discord: DataTypes.STRING,
  points: DataTypes.NUMBER,
  wins: DataTypes.NUMBER,
  losses: DataTypes.NUMBER,
  reps: DataTypes.NUMBER,
})

//db.close()