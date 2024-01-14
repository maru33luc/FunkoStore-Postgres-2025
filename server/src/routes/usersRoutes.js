const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById, addUser, updateUser, 
    deleteUser, authUser, isLoggedIn, logout } = require('../controllers/usersControllers');

router.get ('/', getAllUsers);

router.post ('/auth', authUser); // login

router.get ('/auth', isLoggedIn); // check if logged in

router.post ('/logout', logout);

router.get ('/:id', getUserById);

router.post ('/',addUser); // register

router.put ('/:id', updateUser);

router.delete ('/:id',deleteUser);

module.exports = router;