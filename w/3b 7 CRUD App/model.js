const mongoose = require("mongoose")

const user = new mongoose.Schema({
    name : String,
    username : String,
    password : String
})

const User = mongoose.model("User", user);

module.exports = User;