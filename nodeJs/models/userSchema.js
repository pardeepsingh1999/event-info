const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    age: { 
        type: Number, 
        required: true
    },
    password: { 
        type: String, 
        required: true
    },
    admin: { 
        type: Boolean, 
        default: false 
    },
    saltSecret: String
},
{ collection: 'user', timestamps: true });

module.exports = mongoose.model('user', userSchema);