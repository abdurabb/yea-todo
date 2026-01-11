const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is Required']
    },
    email: {
        type: String,
        required: [true, 'Email is Required']
    },
    password:{
        type:String,
        required:[true,'Password is Required']
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
