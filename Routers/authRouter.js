const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken")
const JWT_KEY = "jdsbgk6sg65ds7gsd7g5ds3g5s"

const authRouter = express.Router();

authRouter
  .route("/signup")
  .get(middleware1, getSignUp, middleware2)
  .post(postSignUp);

authRouter
.route("/login")
.post(loginUser)

function middleware1(req, res, next) {
  console.log("Middleware1 encountered");
  next();
}

function middleware2(req, res, next) {
  console.log("Middleware2 encountered");
  // next();
  // res.json({
  //     message: "middleware 2 ended req/res cycle"
  // })
  console.log("middleware2 called");
  res.sendFile(__dirname + "/public/index.html");
}

function getSignUp(req, res, next) {
  console.log("getSignUp called");
  next();
  // res.sendFile(__dirname + "/public/index.html")
}

async function postSignUp(req, res) {
  let dataObj = req.body;
  try {
    let user = await userModel.create(dataObj);
    res.status(200).send("User successfully registred");
    // res.json({
    //     message: "User signed up",
    //     data: user
    // })
  } catch (error) {
    res.status(400).send("User already registred");
    console.log(error);
  }
}

async function loginUser(req, res){
    try {
        let data = req.body
        if(data.email){
            let user = await userModel.findOne({email: data.email})
            if(user){
                //bcrypt -> compare
                if(user.password == data.password){
                    let uid = user["id"]
                    let token = jwt.sign({payload:uid}, JWT_KEY);

                    // res.cookie("isLoggedIn", true)
                    return res.json({
                        message: "user has loggin in",
                        userDetails: user
                    })
                } else {
                    return res.json({
                        message: "Wrong credentials"
                    })
                }
            } else {
                return res.json({
                    message: "User not found"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}

module.exports = authRouter