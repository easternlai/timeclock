const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    isClockedIn: {
        type: Boolean,
        default: false
    },
});

userSchema.pre('save', async function(next){
    const user = this;

    if(!user.isModified('password')) return next();
    console.log(user.password);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    console.log(user.password);
    next();

});

const User = mongoose.model('User', userSchema);

module.exports = User;