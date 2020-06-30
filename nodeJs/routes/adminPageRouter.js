const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

let eventSchema = require('../models/eventSchema');

router.post('/add-event', (req, res) => {
    // console.log(req.body)
    let {event_name} = req.body;
    let {event_category} = req.body;
    let {event_description} = req.body;
    let {event_location} = req.body;
    let event_date_and_time = req.body.event_date_and_time;

    eventSchema.create({
        event_name: event_name,
        event_category: event_category,
        event_description: event_description,
        event_location: event_location,
        event_date_and_time: event_date_and_time
    })
    .then(e => {
        res.status(200).json({
            message: 'Successfully Event created',
            eventDetail: e
        })
    })
    .catch(err => {
        res.status(501).send(err.name)
    })
})

module.exports = router;