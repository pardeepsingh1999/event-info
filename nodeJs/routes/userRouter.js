const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

let userSchema = require('../models/userSchema');

router.post('/register', (req, res) => {

    let { name } = req.body;
    let { email } = req.body;
    let { age } = req.body;
    let { password } = req.body;

    userSchema.countDocuments( (err, count) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                userSchema.create({
                    name: name,
                    email: email,
                    age: age,
                    password: hash,
                    admin: count>0 ? false : true,
                    saltSecret: salt
                })
                .then(u => {
                    res.status(200).json({
                        message: 'Successfully Registered',
                        regiterId: u._id
                    })
                })
                .catch(err => {
                    if(err.code = 11000) {
                        res.status(400).send(['Duplicate email address found'])
                    } else {
                        res.status(501).send(err.name)
                    }
                })
            })
        })
    })
});

module.exports = router;