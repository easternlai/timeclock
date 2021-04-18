const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeEntriesSchema = new Schema({
    punchIn: {
        type: String,
    },
    punchOut: {
        type: String,
        default: null
    },

    // entry: [{
    //     type: String,
    // }],

    employee: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    day: {
        type: String
    },
    totalHours: {
        type: Number,
        default: null
    }
});


const TimeEntriesModel = mongoose.model('TimeEntries', TimeEntriesSchema);

module.exports = TimeEntriesModel;