const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const cartServices = require('./cartServices');

module.exports = {
    getAllUsers: async() => {
        try{
            const users = await UserModel.findAll();
            return users;
        }catch(error){
            console.log(error);
            return {error: 'Ocurrio un error'};
        }
    },
    getUserById : async(id) => {
        try{
            const user = await UserModel.findByPk(id);
            return user;
        }catch(error){
            console.log(error);
            return {error: 'Ocurrio un error'};
        }
    },
    addUser: async(newUser) => {
        try{
            newUser.password = bcrypt.hashSync(newUser.password, 10);
            const user = await UserModel.create(newUser);
            const cart = await cartServices.createCart(user.id);
            console.log('cart', cart);
            return user;
        }catch(error){
            console.log(error);
            return {error: 'Ocurrio un error'};
        }
    },
    updateUser: async (id, updatedUser) => {
        try {
            // Obtener el usuario actual
            const existingUser = await UserModel.findByPk(id);

            // Verificar si se proporciona una nueva contraseña y si es diferente de la contraseña actual
            if (updatedUser.password && !bcrypt.compareSync(updatedUser.password, existingUser.password)) {
                // Generar un nuevo hash solo si la contraseña se ha cambiado
                updatedUser.password = bcrypt.hashSync(updatedUser.password, 10);
            }else {
                // Si la contraseña no se ha cambiado, eliminarla del objeto updatedUser
                delete updatedUser.password;
            }

            await UserModel.update(updatedUser, {
                where: {
                    id: id,
                },
            });

            return { success: 'Se ha modificado el usuario' };
        } catch (error) {
            console.log(error);
            return { error: 'Ocurrió un error' };
        }
    },
    deleteUser: async(id) => {
        try{
            await UserModel.destroy({
                where: {
                    id: id
                }
            });
            return {success: 'Se ha eliminado el usuario'};
        }catch(error){
            console.log(error);
            return {error: 'Ocurrio un error'};
        }
    },
    getUserByEmail: async(email) => {
        try{
            const user = await UserModel.findOne({
                where: {
                    email: email
                }
            });
            return user;
        }catch(error){
            console.log(error);
            return {error: 'Ocurrio un error'};
        }
    },
    getUserByEmailAndPassword: async (email, password) => {
        try {
            const user = await UserModel.findOne({
                where: {
                    email: email,
                },
            });

            if (user && bcrypt.compareSync(password, user.password)) {
                // Contraseña válida
                return user;
            } else {
                // Credenciales inválidas
                return null;
            }
        } catch (error) {
            console.log(error);
            throw new Error('Ocurrió un error');
        }
    }
}