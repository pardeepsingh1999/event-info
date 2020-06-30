const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

let userSchema = require('../models/userSchema');

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            userSchema.findOne({ email: username }).exec()
            .then( user => {
                if(!user) return done(null, false, {message: 'Email is not found!'});

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) return done(null, false, {message: 'Password matching error!!!'});

                    if(isMatch) 
                        return done(null, user);
                    else
                        return done(null, false, {message: 'Wrong password!'});
                })
            })
            .catch(err => {
                return done(err);
            });
        }
    )
);