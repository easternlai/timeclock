const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const apiRouter = require('./routes');


app.use(cors());


const PORT = process.env.PORT || 8080;

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
const expressServer = app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
})

const io = socketio(expressServer);
app.set('socketio', io);

io.use((socket, next)=>{
    const token = socket.handshake.query.token;

    if(token){
        try{
            const user = jwt.verify(token, process.env.JWT_SECRET);
            if(!user){
                return next(new Error('Not authorized.'));
            }
            socket.user = user;
            return next();
        }catch(err){
            next(err);
        }

    }else{
        return next( new Error('Not authorized.'));
    }
}).on('connection', (socket)=>{
    socket.join(socket.user.id);
    console.log('socket connected: ', socket.id);
});

