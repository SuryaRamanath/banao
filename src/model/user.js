const mongoose = require("mongoose");
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    Email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
            }
        }
    },
    Password:{
        type:String,
        required:true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{ collection: "user", timestamp: true }
);

const model = mongoose.model("userSchema", userSchema);

module.exports = model;