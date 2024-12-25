const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

const { getAllUsers, getUserById, addUser, updateUser, 
    deleteUser, authUser, isLoggedIn, logout } = require('../controllers/usersControllers');

router.get ('/', getAllUsers);

router.post ('/auth', authUser); // login

router.get ('/auth',verifyToken, isLoggedIn); // check if logged in

router.post ('/logout',verifyToken, logout);

router.get ('/:id',verifyToken, getUserById);

router.post ('/',addUser); // register

router.put ('/:id',verifyToken, updateUser);

router.delete ('/:id',deleteUser);

module.exports = router;