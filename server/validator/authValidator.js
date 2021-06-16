const { check } = require('express-validator');

exports.userSignupValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required!'),
    check('email')
        .isEmail()
        .withMessage('Email must be valid!'),
    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least  8 characters long!')
];