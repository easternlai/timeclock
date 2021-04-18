const TimeEntries = require('../models/TimeEntries');
const User = require('../models/User');
const ObjectId = require('mongodb').ObjectId;

const moment = require('moment');

module.exports.addEntry = async (req, res, next) => {
    const { isClockedIn } = req.body;
    const userId = req.user.id;
    const today = moment().format('MM/DD/YYYY');
    try {
        //if first time logging in for the day
        const entryExist = await TimeEntries.findOne({ day: today, employee: ObjectId(userId) });
        if (!entryExist) {
            console.log("new entry created");
            const newEntryStartShift = new TimeEntries({ entry: moment().format(), day: today, employee: userId, totalHours: null });
            newEntryStartShift.save();

            User.updateOne({ _id: userId }, { $set: { isClockedIn: true } }, (err, res) => {
                if (err) throw err;
                console.log('User is clocked in');
            });
            return res.send({isClockedIn: true});
        } else {
            TimeEntries.updateOne({employee: ObjectId(userId), day: today},{$push: {entry: moment().format()}}, (err, response)=>{
                if (entryExist.entry.length %2 == 0){
    
                    User.updateOne({ _id: userId }, { $set: { isClockedIn: true } }, (err, res) => {
                        if (err) throw err;
                        console.log('User is clocked in');
                    });
    
                    res.send({isClockedIn: true});
                } else {
                    
                    User.updateOne({ _id: userId }, { $set: { isClockedIn: false } }, (err, res) => {
                        if (err) throw err;
                        console.log('User is clocked false');
                    });
                    res.send({isClockedIn: false});
    
            }
            });

    }
    } catch (err) {
        res.status(401).send({error: err});
    }

}


module.exports.getEmployeeEntries = async (req, res, next) => {

    const userId = req.user.id;
    

    try {
        const response = await TimeEntries.aggregate([
            { $match: {employee: ObjectId(userId)}},
            { $sort: {day:- 1} },
        ]);

        
        res.send(response);

    } catch (err) {
        return res.status(401).send({ error: err })
    }
}