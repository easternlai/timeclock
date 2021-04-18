const jwt = require('jsonwebtoken');
const authRouter = require('../routes/auth');

module.exports.requiredAuth = async(req,res,next) => {
    const {authorization} = req.headers;
    try {
        jwt.verify(authorization, process.env.JWT_SECRET, (error, decoded)=>{
            if(error){
                res.status(401).send({msg: 'You have set an invalid token'});    
            }
            req.user = decoded;
            return next();

        });
        
    } catch (err) {
        return res.status(401).send({error: err});
    }
    
}