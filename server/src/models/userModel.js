const db = require ('../../data/db');
const { DataTypes } = require('sequelize');

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        unsigned: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
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

module.exports = User;