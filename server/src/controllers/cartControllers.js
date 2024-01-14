const cartServices = require('../services/cartServices');

module.exports = {

    getAllCarts : async (req, res) => {
        try{
            const carts = await cartServices.getCarts();
            res.json(carts);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },

    getCartById: async (req, res) => {
        try{
            const cart = await cartServices.getCartById(req.params.id);
            res.json(cart);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    getCartItems: async (req, res) => {
        try{
            const cartItems = await cartServices.getCartItems(req.params.id);
            res.json(cartItems);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    addItemToCart: async (req, res) => {
        try{
            const cartItem = await cartServices.addItemToCart(req.params.id, req.body);
            res.json(cartItem);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    updateItemInCart: async (req, res) => {
        try{
            const cartItem = await cartServices.updateItemInCart(req.params.id, req.body);
            res.json(cartItem);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    deleteItemFromCart: async (req, res) => {
        try{
            const cartItem = await cartServices.deleteItemFromCart(req.params.id, req.body);
            res.json(cartItem);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    }
}