const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const config = require('./config/config');

const app = express();

app.use( express.static( path.join(__dirname, 'public') ) );

mongoose.connect(config.mongodb, config.mongodbOptions);
const db = mongoose.connection;

db.once('open', () => console.log('Connected to MongoDB successfully!!!'));
db.on('error', (err) => console.log(`MongoDb error: ${err}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

//passport config
require('./config/passportConfig');

//passport middleware
app.use(passport.initialize());

app.get('/', (req, res) => {
    res.send('work')
});

const indexRouter = require('./routes/indexRouter');

app.use('/api', indexRouter);

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`)
});