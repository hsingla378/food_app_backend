const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModel");
const protectRoute = require("../Routers/authHelper");

userRouter
  .route("/")
  .get(protectRoute, getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/getCookies").get(getCookies);

userRouter.route("/setCookies").get(setCookies);

userRouter.route("/:id").get(getUserById);

async function getUsers(req, res) {
  // console.log(req.query);
  let allUsers = await userModel.find();
  let user = await userModel.findOne({ name: "Himanshu" });
  res.json({
    message: "List of all users",
    data: allUsers,
  });
}

function postUser(req, res) {
  console.log(req.body);
  users = req.body;
  res.json({
    message: "Data recieved succesfully",
    user: req.body,
  });
}

async function updateUser(req, res) {
  // console.log("req.body => ", req.body);
  let dataToBeUpdated = req.body;
  let user = await userModel.findOneAndUpdate(
    { email: "ankush@gmail.com" },
    dataToBeUpdated
  );
  // for(key in dataToBeUpdated){
  //     users[key] = dataToBeUpdated[key]
  // }
  res.json({
    message: "Data updated successfully",
  });
}

async function deleteUser(req, res) {
  // users = {}
  let dataToBeDeleted = req.body;
  let user = await userModel.findOneAndDelete(dataToBeDeleted);
  res.json({
    message: "Data successfully deleted",
    data: user,
  });
}

function getUserById(req, res) {
  console.log(req.params.id);
  let paramId = req.params.id;
  let obj = {};
  for (let i = 0; i < users.length; i++) {
    if (users[i]["id"] == paramId) {
      obj = users[i];
    }
  }

  res.json({
    message: "req recieved",
    data: obj,
  });
}

function setCookies(req, res) {
  res.cookie("isLoggedIn", false, {
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
    httpOnly: true,
  });
  res.send("cookies has been set");
}

function getCookies(req, res) {
  let cookies = req.cookies;
  console.log(cookies);
  res.send("cookie received");
}

module.exports = userRouter;
