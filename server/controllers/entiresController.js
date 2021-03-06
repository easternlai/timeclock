const TimeEntries = require('../models/TimeEntries');
const User = require('../models/User');
const ObjectId = require('mongodb').ObjectId;

const moment = require('moment');

const {sendPunch} =require('../handlers/socketHandler');

module.exports.addEntry = async (req, res, next) => {
    const userId = req.user.id;
    const today = moment().format('MM/DD/YYYY');
    try {
        const user = await User.findOne({_id: userId});
         if(user.isClockedIn){
             await TimeEntries.updateOne({_id: user.clockInTime}, { $set: {punchOut: moment().format()}});
            
             User.updateOne({ _id: userId }, { $set: { isClockedIn: false, clockInTime: null } }, (err, res) => {
                if (err) throw err;
                sendPunch(req, false, userId);
                console.log('User is clocked out');
            });
            res.send('endshift')
         }else{

            const startShift = new TimeEntries({
                punchIn: moment().format(),
                employee: ObjectId(userId),
                day: today
            });

            await startShift.save();
            User.updateOne({ _id: userId }, { $set: { isClockedIn: true, clockInTime: ObjectId(startShift._id) } }, (err, res) => {
                         if (err) throw err;
                         sendPunch(req, true, userId);
                         console.log('User is clocked in');
                     });
            res.send('startShift');
         }

    } catch (err) {
        res.status(401).send({ error: err });
    }

}


module.exports.getEmployeeEntries = async (req, res, next) => {

    const userId = req.user.id;


    try {
        const response = await TimeEntries.aggregate([
            { $match: { employee: ObjectId(userId) } },
            { $sort: { punchIn: -1 } },
        ]);


        res.send(response);

    } catch (err) {
        return res.status(401).send({ error: err })
    }
}