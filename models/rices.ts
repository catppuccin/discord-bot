import Sequelize from "sequelize"
const { DataTypes } = Sequelize
import Utils from "../modules/utils.js"

export const Rice = Utils.db.define('rice', {
  title: DataTypes.STRING,
  dewm: DataTypes.STRING,
  image: DataTypes.STRING,
  user: DataTypes.STRING,
  uuid: DataTypes.STRING,
  message: {
    type: DataTypes.STRING,
    set(value) {
      this.setDataValue('message', value)
    }
  }
})