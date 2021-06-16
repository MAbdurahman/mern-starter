const express = require('express');
const { signup } = require('../controllers/authControllers.js');

//**************** variables ****************//
const router = express.Router();

//**************** routes ****************//
router.post('/signup', signup);

module.exports = router;