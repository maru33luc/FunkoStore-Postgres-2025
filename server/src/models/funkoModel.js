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
    image_url: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.front_image;
        }
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
    schema: 'public',
    indexes: [
      {
        name: 'idx_funkos_category',
        fields: ['category']
      },
      {
        name: 'idx_funkos_name',
        fields: ['name']
      },
      {
        name: 'idx_funkos_price',
        fields: ['price']
      },
      {
        name: 'idx_funkos_licence',
        fields: ['licence']
      }
    ]
});

Funko.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    values.image_url = this.image_url;
    return values;
};

module.exports = Funko;