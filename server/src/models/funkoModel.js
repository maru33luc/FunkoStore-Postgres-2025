const db = require ('../../data/db');
const { DataTypes } = require('sequelize');

const Funko = db.define('funkos', {
    id: {
        type: DataTypes.INTEGER,
        unsigned: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    serie: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    licence: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    front_image: {
        type: DataTypes.STRING(350),
        allowNull: false
    },
    back_image: {
        type: DataTypes.STRING(350),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: true
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

module.exports = Funko;