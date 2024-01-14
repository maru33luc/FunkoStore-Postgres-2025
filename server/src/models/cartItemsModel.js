const db = require ('../../data/db');
const { DataTypes } = require('sequelize');
const Cart = require('./cartModel');
const Funko = require('./funkoModel');

const CartItem = db.define('cart_items', {
    id: {
        type: DataTypes.INTEGER,
        unsigned: true,
        primaryKey: true,
    },
    id_cart: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'carts',
            key: 'id'
        }
    },
    id_funko: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'funkos',
            key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        timestamps: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        timestamps: true,
      }
},{
    schema: 'public'
});

module.exports = CartItem;