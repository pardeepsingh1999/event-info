const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('./config');

module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) 
            return res.status(400).json(err);
        else
            if(user) return res.status(200).json({
                "loginToken": jwt.sign(
                    {
                        userId: user._id,
                        name: user.name,
                        email: user.email,
                        admin: user.admin
                    },
                    config.jwt_secret_key,
                    {
                        expiresIn: config.jwt_expiresIn
                    }
                )
            });
            else return res.status(404).json(info);
    })(req, res);
};

module.exports.verifyJwtToken = (req, res, next) => {
    function verifyUser(token) {
        jwt.verify(token, config.jwt_secret_key, (err, decode) => {
            if(err){
                console.log(err);
                res.json({ message: 'Auth Failed!!'})
            } else {
                req.user = decode;
                next();
            }
        })
    };
    if(req.headers.authorization) {
        try {
            const getToken = req.headers.authorization.split(' ');
            getToken[0] = 'Bearer' ? 
                verifyUser(getToken[1]) :                
                res.json({ message : 'Bearer token is not present in the authorization'});
        } catch (error) {
            console.log(error);
            res.json({ message: 'Auth Failed!!' })
        }
    } else {
        res.json({ message: 'Authorisation header is not present'});
    }
}

// verify for admin
module.exports.verifyJwtTokenForAdmin = (req, res, next) => {
    function verifyUser(token) {
        jwt.verify(token, config.jwt_secret_key, (err, decode) => {
            if(err){
                console.log(err);
                res.json({ message: 'Auth Failed!!'})
            } else {
                if(decode.admin) {
                    req.user = decode;
                    next();
                } else {
                    res.json({ message: 'Admin Auth Failed!!'})
                }
            }
        })
    };
    if(req.headers.authorization) {
        try {
            const getToken = req.headers.authorization.split(' ');
            getToken[0] = 'Bearer' ? 
                verifyUser(getToken[1]) :                
                res.json({ message : 'Bearer token is not present in the authorization'});
        } catch (error) {
            console.log(error);
            res.json({ message: 'Auth Failed!!' })
        }
    } else {
        res.json({ message: 'Authorisation header is not present'});
    }
}
