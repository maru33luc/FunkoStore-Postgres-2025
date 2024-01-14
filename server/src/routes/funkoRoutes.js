const express = require('express');
const { getAllFunkos, getFunkoById, addFunko, updateFunko, deleteFunko } = require('../controllers/funkoControllers');
const router = express.Router();

router.get ('/', getAllFunkos);

router.get ('/:id', getFunkoById);

router.post ('/',addFunko);

router.put ('/:id', updateFunko);

router.delete ('/:id',deleteFunko);

module.exports = router;

