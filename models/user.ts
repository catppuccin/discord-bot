import { Model, DataTypes } from "sequelize"
import Utils from "../modules/utils"

class User extends Model {}

User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { 
  sequelize: Utils.db,
  modelName: 'user' 
})

export default User