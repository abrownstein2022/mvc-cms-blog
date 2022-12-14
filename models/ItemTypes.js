const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//import { Model, DataTypes } from 'sequelize';
//import sequelize from '../config/connection.js';

/**
 * create our ItemTypes model
*/
class ItemTypes extends Model {}  

// create fields/columns for Restaurants model
ItemTypes.init(
  {
    item_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    item_type_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, 
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'itemtypes'   //lowercase for modelname only
  }
);

module.exports = ItemTypes;
//export default ItemTypes;
