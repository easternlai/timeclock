const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const jwt = require('jwt-simple');
const app = express();

const apiRouter = require('./routes');

const PORT = process.env.PORT || 9000;

//require dotenv if not production

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
//body parsing middleware
app.use(express.json());

// use routes
app.use('/api', apiRouter);

//connect to mongoose database

(async function () {
    try {

        await mongoose.connect(
            process.env.mongoURI,
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
                useUnifiedTopology: true,
            }
        );
        
        console.log('Conntect to database');
    } catch (err) {
        console.log(err)
    }
})()

//listen for expres server
app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
})

// use sockets

//receive token via socket



