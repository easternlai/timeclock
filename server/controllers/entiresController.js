const TimeEntries = require('../models/TimeEntries');
const User = require('../models/User');
const ObjectId = require('mongodb').ObjectId;

const moment = require('moment');

module.exports.addEntry = async (req, res, next) => {
    const userId = req.user.id;
    const today = moment().format('MM/DD/YYYY');
    try {
        const user = await User.findOne({_id: userId});
         if(user.isClockedIn){
             const test = await TimeEntries.updateOne({_id: user.clockInTime}, { $set: {punchOut: moment().format()}});
             console.log(test);
             User.updateOne({ _id: userId }, { $set: { isClockedIn: false, clockInTime: null } }, (err, res) => {
                if (err) throw err;
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
            console.log(startShift._id);
            console.log(userId);
            User.updateOne({ _id: userId }, { $set: { isClockedIn: true, clockInTime: ObjectId(startShift._id) } }, (err, res) => {
                         if (err) throw err;
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
            { $sort: { clockIn: 1 } },
        ]);


        res.send(response);

    } catch (err) {
        return res.status(401).send({ error: err })
    }
}