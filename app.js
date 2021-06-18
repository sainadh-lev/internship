
// i did not created any html pages i solved this using postman app  

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB",{ useNewUrlParser: true,useUnifiedTopology: true });
// this line code connects the mongodb to our local server

const usershema  = new mongoose.Schema({
    id:Number,
    name:String,
    college:String
});

const User = mongoose.model("User",usershema);

app.get("/user",function(req,res) {
    User.find(function(err,usersfound) {
        if(!err)
        res.send(usersfound);
        else
        res.send(err);
    });
});

app.post("/User",function(req,res) {
    console.log(req.body.id);
    console.log(req.body.college);
    console.log(req.body.name);
    const newuser = new User({
        id:req.body.id,
        colloge:req.body.college,
        name:req.body.name
    });
    newuser.save(function(err) {
        if(!err) {
            res.send("succesfully added");
        }
        else {
            res.send(err);
        }
    });
});

// here we also use app.route("/user/:id")

app.get("/User/:id",function(req,res) {
    console.log(req.params.id); // route paramters
    User.find({id:req.params.id},function(err,founduser) {
        if(founduser) {
            res.send(founduser);
        }
        else {
            res.send("user id  is not found");
        }
    });
});

app.put("/User/:id",function(req,res) {
    console.log(req.body);
    User.replaceOne(
        {id:req.params.id},
        req.body,
        {overwrite: true},
        function(err,result) {
            if(err)
            res.send(err);
            else
            res.send("successfully updated");
        }
    );
});

app.delete("/User/:id",function(req,res) {
    User.deleteOne(
        {id:req.params.id},
        function(err) {
            if(!err) {
                res.send("successfully deleted");
            }
            else {
                res.send(err);
            }
        }
    )
});

app.listen(4000,function() {
    console.log("Server started on port 4000");
});
