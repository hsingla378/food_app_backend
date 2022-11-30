const mongoose = require("mongoose")
require("dotenv").config()
const emailValidator = require("email-validator")
const bcrypt = require("bcrypt")

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
        unique: true,
        validate:function(){
            return emailValidator.validate(this.email)
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: function(){
            return this.confirmPassword == this.password
        }
    }
})

//before saving in database
// userSchema.pre("save", function(){
//     console.log("before saving in database", this)
// })

//after saving in database
// userSchema.post("save", function(doc){
//     console.log("after saving in database", doc)
// })

userSchema.pre("save", function(){
    this.confirmPassword = undefined
})

// userSchema.pre("save", async function(){
//     let salt = await bcrypt.genSalt()
//     let hashedString = await bcrypt.hash(this.password, salt)
//     this.password = hashedString
// })

//models

const userModel = mongoose.model("userModel", userSchema)
module.exports = userModel
