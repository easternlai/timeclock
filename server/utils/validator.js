const {check, validationResult } = require('express-validator');

//@desc Validation requirements for Posting new user.

exports.newUserForm = [
    check('email').isEmail().withMessage('Please enter a valid email.'),
    check('username').isLength({min:3, max:22}).withMessage('Please enter a username with 3 to 22 characters.'),
    check('fullName').not().isEmpty().withMessage('Full Name is a required field.'),
    check('password').isLength({min:6, max: 16}).withMessage('Please enter a password between 6 and 16 characters.'),
];

exports.authForm = [
    check('usernameOrEmail').not().isEmpty().withMessage('Please enter a valid username or email address.'),
    check('password').not().isEmpty().withMessage('Please enter your password'),
];
