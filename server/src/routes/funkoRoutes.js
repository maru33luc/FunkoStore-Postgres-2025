const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const { getAllFunkos, getFunkoById, addFunko, updateFunko, deleteFunko } = require('../controllers/funkoControllers');
const router = express.Router();

router.get ('/', getAllFunkos);

router.get ('/:id', getFunkoById);

router.post ('/', verifyToken, addFunko);

router.put ('/:id', verifyToken, updateFunko);

router.delete ('/:id', verifyToken, deleteFunko);

module.exports = router;

