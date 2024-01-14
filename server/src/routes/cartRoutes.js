const express = require('express');
const router = express.Router();

const { getCartById, getCartItems, addItemToCart,
updateItemInCart, deleteItemFromCart,
getAllCarts } = require('../controllers/cartControllers');

router.get ('/:id', getCartById); // obtener el carrito de un usuario

// obtener todos los carritos de la tabla itemscart
router.get ('/', getAllCarts); 

router.get ('/items/:id', getCartItems); // obtener los items de un carrito

router.post ('/items/:id', addItemToCart); // agregar un item al carrito

router.put ('/items/:id', updateItemInCart); // actualizar un item del carrito

router.delete ('/items/:id', deleteItemFromCart);// eliminar un item del carrito

module.exports = router;