const express = require('express');
const authRouter = express.Router();
const {register, loginAuthentication} = require('../controllers/authController');
const validator = require('../utils/validator');


authRouter.post('/register',validator.newUserForm, register);
authRouter.post('/login', validator.authForm, loginAuthentication);

module.exports=authRouter;