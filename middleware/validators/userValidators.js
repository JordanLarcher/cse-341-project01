const {body} = require('express-validator');

exports.userValidationRules = [
    body('email').isEmail().withMessage('Invalid email'),
    body('username').notEmpty().withMessage('Username is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('ip').isIP().withMessage('Invalid IP Address')
];