// import mongoose to create new shema

const mongoose = require('mongoose');

// create Schema
 const UserItem = new mongoose.Schema({
    name : {
        type:String,
        required :true ,
    },
    email : {
        type:String,
        required :true ,
    },
    age : Number
 })
 // export 
 module.exports = mongoose.model('user',UserItem)