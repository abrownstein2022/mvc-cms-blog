const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//import { Model, DataTypes } from 'sequelize';
//import sequelize from '../config/connection.js';

/**
 * create our OrderItems model
*/
class OrderItems extends Model {}  

// create fields/columns for Restaurants model
OrderItems.init(
  {
    order_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'orders',
        key: 'order_id',
        unique: false
      }
    },
    item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'items',
        key: 'item_id',
        unique: false
      }
    }, 
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1  
    }
  }, 
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'orderitems'   //lowercase for modelname only
  }
);

module.exports = OrderItems;
//export default OrderItems;
