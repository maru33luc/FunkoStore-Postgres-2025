'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     // Crea la tabla "users"
     await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        unsigned: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Crea la tabla "funkos"
    await queryInterface.createTable('funkos', {
      id: {
        type: Sequelize.INTEGER,
        unsigned: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      serie: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      licence: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      front_image: {
        type: Sequelize.STRING(350),
        allowNull: false,
      },
      back_image: {
        type: Sequelize.STRING(350),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Crea la tabla "carts"
    await queryInterface.createTable('carts', {
      id: {
        type: Sequelize.INTEGER,
        unsigned: true,
        primaryKey: true,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Crea la tabla "cart_items"
    await queryInterface.createTable('cart_items', {
      id: {
        type: Sequelize.INTEGER,
        unsigned: true,
        primaryKey: true,
      },
      id_cart: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'carts',
          key: 'id',
        },
      },
      id_funko: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'funkos',
          key: 'id',
        },
      },
      cantidad: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cart_items');
    await queryInterface.dropTable('carts');
    await queryInterface.dropTable('funkos');
    await queryInterface.dropTable('users');
  }
};
