const express = require("express")
const app = express()

app.listen(3000)

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html")
})

app.get("/about", function(req, res) {
    res.sendFile(__dirname + "/views/about.html")
})

app.get("/about-me", function(req, res) {
    res.redirect("/about")
})

app.use((req, res) => {
    console.log("backend", log)
    res.status(404)
    res.sendFile(__dirname + "/views/404.html")
})