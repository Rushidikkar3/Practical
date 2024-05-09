const express = require("express");
const mongoose = require("mongoose");

const User = require("./model.js")
const app = express();
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/exp7").then(()=> {
    console.log("Database is connected")
})


// Create
app.post("/register", async (req, res) => {
    const {name, username, password} = req.body;
    const isUsername = await User.findOne({username})
    if(isUsername) {
        return res.json({message : "Username already present"})
    }
    await User.create({name, username, password});
    res.json({message : "User created Successfully"})
})

// Read
app.get("/read", async (req, res) => {
    const users = await User.find({}, "name")
    res.json(users);
})


// Update
app.put("/update", async (req, res) => {
    const {name, username} = req.body;
    const isUsername = await User.findOne({username})
    if(!isUsername) {
        return res.json({message : "Username not present"})
    }
    await User.findOneAndUpdate({username}, {name})
    res.json({message : "Name updated successfully"})
});


// Delete
app.delete("/delete", async (req, res) => {
    const {username} = req.body;
    const isUsername = await User.findOne({username})
    if(!isUsername) {
        return res.json({message : "Username not present"})
    }

    await User.findOneAndDelete({username});
    res.json({message : "User Deleted Successfully"})
})

app.listen(3000, (req, res) => {
    console.log("Server is running")
});