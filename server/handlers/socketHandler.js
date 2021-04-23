module.exports.sendPunch = (req, isClockedIn, receiver) => {
    const io = req.app.get('socketio');
    console.log('test punch')
    io.sockets.in(receiver).emit('newPunch', isClockedIn);
    console.log('socket punch sent');
}