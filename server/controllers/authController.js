const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {check, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

//@route POST api/auth/register
//@desc Registers user

module.exports.loginAuthentication = async(req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(401).send({errors: errors.array()});

    const {usernameOrEmail, password} = req.body;

    // find out if user exist else send fail login

    const user = await User.findOne({$or:[{email:usernameOrEmail}, {username:usernameOrEmail}]});

    if(!user) return res.status(401).send({error: 'Invalid credentials'});

    // find out if passwords are the same, if not send fail login

    bcrypt.compare(password, user.password, function (err, val){
        if(err) return next(err);
        if(!val) return res.status(401).send({error: 'Invalid credentials'});
        res.send({user:{_id: user._id, email: user.email, username: user.username, fullName: user.fullName}, token: jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '5h'})});
    });

}

module.exports.register = async (req, res, next) => {

    //check for incomplete form: express-valiator/check or manual input

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }

    const {fullName, username, email, password } = req.body;

  try {

    //check if user already exist

    const usernameExist = !!(await User.findOne({username}));

    if(usernameExist) return res.status(401).send({error: 'This username already exist.'});

    //check if email already exist

    const emailExist = !!(await User.findOne({email}));

    if(emailExist) return res.status(401).send({error: 'There is already an account associated with this email address.'});
    
    //create user

    const user = new User({fullName, username, email, password});

    //save user
    user.save();
    //jwt token 

    res.send({user:{_id: user._id, fullName: user.fullName, username: user.username, email: user.email}, token: jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'5h'})});
      
  } catch (err) {
      console.log(err);
  }
}