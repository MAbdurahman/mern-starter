const { check } = require("express-validator");

//**************** variables ****************//
const name_pattern =
    /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/i;
const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const password_pattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*?]).{8,}$/i;
const lowercase_pattern = /^(?=.*[a-z])/g;
const uppercase_pattern = /^(?=.*[A-Z])/g;
const digit_pattern = /^(?=.*\d{1,})/g;
const special_pattern = /(?=.*[-+_!@#$%^&*?])/g;
const phone_pattern = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s.]{0,1}[0-9]{3}[-\s.]{0,1}[0-9]{4}$/i;
const zipcode_pattern = /\d{5}(?:[- ]?\d{4})?/g;

exports.userSignupValidator = [
    check("name")
        .not()
        .isEmpty()
        .withMessage("First and last name is required!")
        .matches(name_pattern)
        .withMessage("Enter first and last name!"),
    check("email")
        .not()
        .isEmpty()
        .withMessage("Email is required!")
        .matches(email_pattern)
        .withMessage("Enter a valid email!")
        .isEmail()
        .withMessage("Email must be valid!"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("Password is required!")
        .matches(lowercase_pattern)
        .withMessage('Password must have a lowercase character!')
        .matches(uppercase_pattern)
        .withMessage('Password must have an uppercase character!')
        .matches(digit_pattern)
        .withMessage('Password must have a digit character!')
        .matches(special_pattern)
        .withMessage(`Password must include at least one: '-+_!@#$%^&*?'`)
        .matches(password_pattern)
        .withMessage('Password must have at least 8 characters!')
];
