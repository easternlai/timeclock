const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeEntriesSchema = new Schema({
    entry: [{
        type: String,
    }],
    employee: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    day: {
        type: String
    },
    totalHours: {
        type: Number
    }
});


const TimeEntriesModel = mongoose.model('TimeEntries', TimeEntriesSchema);

module.exports = TimeEntriesModel;