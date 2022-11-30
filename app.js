// const { json } = require("express")
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT;
const emailValidator = require("email-validator");
const cookieParser = require("cookie-parser")

app.use(express.json());
app.listen(port);
app.use(cookieParser())

const userRouter = require("./Routers/userRouter")
const authRouter = require("./Routers/authRouter")

app.use("/user", userRouter);
app.use("/auth", authRouter);

let users = [
  {
    id: 1,
    name: "Himanshu",
  },
  {
    id: 2,
    name: "Ankush",
  },
  {
    id: 3,
    name: "Deepak",
  },
];
