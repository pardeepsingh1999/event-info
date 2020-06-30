const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

let eventSchema = require('../models/eventSchema');

router.get('/', (req, res) => {

    eventSchema.find().exec()
    .then(e => {
        res.status(200).json({
            message: 'Successfully get eventDetail',
            eventDetail: e
        })
    })
    .catch(err => {
        res.status(501).send(err.name)
    })
})

module.exports = router;