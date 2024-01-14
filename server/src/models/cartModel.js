const db = require ('../../data/db');
const { DataTypes } = require('sequelize');
const User = require('./userModel');

const Cart = db.define('carts', {
    id: {
        type: DataTypes.INTEGER,
        unsigned: true,
        primaryKey: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        timestamps: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        timestamps: true,
      }
},{
  schema: 'public'
});

module.exports = Cart;