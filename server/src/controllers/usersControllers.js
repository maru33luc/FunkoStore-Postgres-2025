// const session = require('express-session');
const jwt = require('jsonwebtoken');
const userServices = require('../services/userServices');
const { env, loadEnvFile} = require ('node:process')
process.loadEnvFile("./.env")


const secretKey = env.JWT_SECRET || 'your_secret_key';



module.exports = {
    getAllUsers: async(req, res) => {
        try{
            const users = await userServices.getAllUsers();
            res.json(users);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    getUserById: async (req, res) => {
        try{
            const user = await userServices.getUserById(req.params.id);
            res.json(user);
        }
        catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    addUser: async (req, res) => {
        try{
            const user = await userServices.addUser(req.body);
            res.json(user);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    updateUser: async (req, res) => {
        try{
            const user = await userServices.updateUser(req.params.id, req.body);
            res.json(user);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    deleteUser: async (req, res) => {
        try{
            const user = await userServices.deleteUser(req.params.id);
            res.json(user);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    authUser : async (req, res) => {
        try{
            const email = req.body.email;
            const password = req.body.password;
            const user = await userServices.getUserByEmailAndPassword(email, password);

            // con jwt para autenticacion
            if (user) {
                // Generar un token
                const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
                res.json({ token }); // Enviar el token al cliente

            }else{
                res.status(401).json({ error: 'Credenciales inválidas' });
            }
        //    establecer una cookie de sesion
        //     req.session.user = user;
        //     req.session.auth = true;
        //     res.cookie('user', user, { httpOnly: true, secure: true });
        //     res.json(user);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    isLoggedIn : async (req, res) => {
        if(req.userId){
            const user = await userServices.getUserById(req.userId)
            if(user){
                console.log(user);
                res.json(user);
            }

        }else{
            res.json({error: 'No autorizado'});
        }
    },
    logout : (req, res) => {
        req.userId.destroy();
        // eliminar cookie del navegador
        // res.clearCookie('user');
        res.json({message: 'Sesion cerrada'});
    }
}
