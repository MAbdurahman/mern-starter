const express = require('express');
const { signup } = require('../controllers/authControllers.js');
const { userSignupValidator } = require('../validators/authValidator.js');
const { runValidation } = require('../validators/validatorRunner.js')

//**************** variables ****************//
const router = express.Router();

//**************** routes ****************//
router.post('/signup', userSignupValidator, runValidation, signup);

module.exports = router;