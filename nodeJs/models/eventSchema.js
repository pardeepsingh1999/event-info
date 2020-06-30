const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    event_name: { 
        type: String, 
        required: true
    },
    event_category: { 
        type: String, 
        required: true
    },
    event_description: { 
        type: String, 
        required: true
    },
    event_location: { 
        type: String, 
        required: true
    },
    event_date_and_time: { 
        type: String, 
        required: true
    },
},
{ collection: 'event', timestamps: true });

module.exports = mongoose.model('event', eventSchema);