'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Agregar índices a la tabla funkos para mejorar el rendimiento de consultas
    await queryInterface.addIndex('funkos', ['category'], {
      name: 'idx_funkos_category'
    });
    
    await queryInterface.addIndex('funkos', ['name'], {
      name: 'idx_funkos_name'
    });
    
    await queryInterface.addIndex('funkos', ['price'], {
      name: 'idx_funkos_price'
    });
    
    await queryInterface.addIndex('funkos', ['licence'], {
      name: 'idx_funkos_licence'
    });
  },

  async down (queryInterface, Sequelize) {
    // Eliminar los índices si se revierte la migración
    await queryInterface.removeIndex('funkos', 'idx_funkos_category');
    await queryInterface.removeIndex('funkos', 'idx_funkos_name');
    await queryInterface.removeIndex('funkos', 'idx_funkos_price');
    await queryInterface.removeIndex('funkos', 'idx_funkos_licence');
  }
};