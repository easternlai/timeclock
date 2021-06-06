const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {validateEmail, validateUsername, validateFullName, validatePassword} = require('../utils/validation');

//@route POST api/auth/register
//@desc Registers user

module.exports.loginAuthentication = async(req, res, next) => {
    const { token } = req.headers;
    
    const {usernameOrEmail, password} = req.body || null;

    try {
        if(token){
            const decodedId = await jwt.verify(token, process.env.JWT_SECRET).id;
            const decodedUser = await User.findOne({_id: decodedId});
            return res.send({user:{_id: decodedUser._id, email: decodedUser.email, username: decodedUser.username, fullName: decodedUser.fullName, isClockedIn: decodedUser.isClockedIn}, token});
        }

        if(!usernameOrEmail || !password){
            return res
            .status(400)
            .send({ error: 'Please provide both a username/email and a password.' });
        }

        const user = await User.findOne({$or:[{email:usernameOrEmail}, {username:usernameOrEmail}]});
    
        if(!user) return res.status(401).send({error: "The credentials you've entered are invalid."});
    
        // find out if passwords are the same, if not send fail login
    
        bcrypt.compare(password, user.password, function (err, val){
            if(err) return next(err);
            if(!val) return res.status(401).send({error: "The credentials you've entered are invalid."});
            res.send({user:{_id: user._id, email: user.email, username: user.username, fullName: user.fullName, isClockedIn: user.isClockedIn}, token: jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '5h'})});
            
        });
    
    } catch (err) {
        next(err);
    }
}

//@route POST api/auth/register
//@desc Registers user

module.exports.register = async (req, res, next) => {


    const {fullName, username, email, password } = req.body;

    const validateEmailError = validateEmail(email);
    const validateUsernameError = validateUsername(username);
    const validateFullNameError = validateFullName(fullName);
    const validatePasswordError = validatePassword(password);

    if(validateFullNameError){
        console.log(validateFullNameError);
        return res.status(401).send({error: validateFullNameError});
    }


    if(validateEmailError){
        console.log(validateEmailError)
        return res.status(401).send({error: validateEmailError});
    }

    if(validateUsernameError){
        console.log(validateUsernameError);
        return res.status(401).send({error: validateUsernameError});
    }

    if(validatePasswordError){
        console.log(validatePasswordError);
    }

  try {

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

    res.send({user:{_id: user._id, fullName: user.fullName, username: user.username, email: user.email, isClockedIn: user.isClockedIn}, token: jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'5h'})});
      
  } catch (err) {
      console.log(err);
  }
}