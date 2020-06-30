const express = require('express');
const router = express.Router();

let auth = require('../config/auth');

let userRouter = require('./userRouter');
let eventDetailRouter = require('./eventDetailRouter');

let adminPageRouter = require('./adminPageRouter');


router.use('/user', userRouter);
router.use('/auth', auth.authenticate);
router.use('/eventDetails', auth.verifyJwtToken, eventDetailRouter);

router.use('/admin', auth.verifyJwtTokenForAdmin, adminPageRouter);



module.exports = router;