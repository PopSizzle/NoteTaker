var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// routes

// index.html
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

// notes.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});


// Get notes from saved storage
app.get("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "db/db.json"), function(err, data) {
        if(err){
            console.log(err);
        }
        var storedNotes = JSON.parse(data);
        res.json(storedNotes);
    });
});

// post notes to saved storage
app.post("/api/notes", function(req, res) {
    
    let note = req.body;

    fs.appendFile("/db/db.json", note, function(err) {

        if (err) {
            return console.log(err);
        }
    console.log("Success!");
    });

    fs.readFile(path.join(__dirname, "db/db.json"), function(err, data) {
        if(err){
            console.log(err);
        }
        var storedNotes = JSON.parse(data);
        res.json(storedNotes);
    });
});


// start server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT)
})

