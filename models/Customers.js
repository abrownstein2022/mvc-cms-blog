const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//import { Model, DataTypes } from 'sequelize';
//import sequelize from '../config/connection.js';

/**
 * create our Customers model
*/
class Customers extends Model {}  

// create fields/columns for Restaurants model
Customers.init(
  {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customer_last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    business_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customer_login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customer_password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, 
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'customers'   //lowercase for modelname only
  }
);

module.exports = Customers;
//export default Customers;
