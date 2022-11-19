// const { json } = require("express")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

app.use(express.json())
app.listen(3000)

let users = [
    {
        "id": 1, 
        "name": "Himanshu"
    }, 
    {
        "id": 2, 
        "name": "Ankush"
    }, 
    {
        "id": 3, 
        "name": "Deepak"
    }
]

//Mini app
const userRouter = express.Router()
const authRouter = express.Router()

//base route
app.use("/user", userRouter)
app.use("/auth", authRouter)

userRouter
.route("/")
.get(getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route("/:id")
.get(getUserById)

authRouter
.route("/signup")
.get(middleware1, getSignUp, middleware2)
.post(postSignUp)

async function getUsers(req, res){
    // console.log(req.query);
    let allUsers = await userModel.find()
    let user = await userModel.findOne({name: "Himanshu"})
    res.json({
        message: "List of all users",
        data: allUsers
    })
}

function postUser(req, res){
    console.log(req.body);
    users = req.body
    res.json({
        message: "Data recieved succesfully",
        user: req.body
    })
}

async function updateUser(req, res){
    // console.log("req.body => ", req.body);
    let dataToBeUpdated = req.body
    let user = await userModel.findOneAndUpdate({email:"ankush@gmail.com"}, dataToBeUpdated)
    // for(key in dataToBeUpdated){
    //     users[key] = dataToBeUpdated[key]
    // }
    res.json({
        message: "Data updated successfully" 
    })
}

async function deleteUser(req, res){
    // users = {}
    let dataToBeDeleted = req.body
    let user = await userModel.findOneAndDelete(dataToBeDeleted)
    res.json({
        message: "Data successfully deleted",
        data: user
    })
}

function getUserById(req, res){
    console.log(req.params.id);
    let paramId = req.params.id
    let obj = {}
    for(let i = 0; i < users.length; i++){
        if(users[i]["id"] == paramId){
            obj = users[i]
        }
    }

    res.json({
        message: "req recieved",
        data: obj
    })
}

function middleware1(req, res, next){
    console.log("Middleware1 encountered")
    next();
}

function middleware2(req, res, next){
    console.log("Middleware2 encountered")
    // next();
    // res.json({
    //     message: "middleware 2 ended req/res cycle"
    // })
    console.log("middleware2 called");
    res.sendFile(__dirname + "/public/index.html")
}

function getSignUp(req, res, next){
    console.log("getSignUp called")
    next()
    // res.sendFile(__dirname + "/public/index.html")
}

async function postSignUp(req, res){
    let dataObj = req.body
    try {
        let user = await userModel.create(dataObj)
        res.status(200).send("User successfully registred")
        // res.json({
        //     message: "User signed up",
        //     data: user
        // })
    } catch (error) {
        res.status(400).send("User already registred")
    }
}

const db_link = process.env.MONGO_URI
mongoose.connect(db_link)
.then(function(db){
    console.log("db connected")
    // console.log(db);
})
.catch(function(err){
    console.log(err)
})

//createing Schema

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8
    }
})

//models

const userModel = mongoose.model("userModel", userSchema)

async function createUser(){
    let user = {
        name: "Deepak",
        email: "deepak@gmail.com",
        password: "12345678",
        confirmPassword: "12345678"
    }

    let data = await userModel.create(user)
    console.log(data);
}

// createUser()