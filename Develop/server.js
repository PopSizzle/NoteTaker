var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

var PORT = process.env.PORT || 3000;

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
    fs.readFile(__dirname, "db/db.json", function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("Success!");
        
        const result = JSON.parse(data);
        result.push(note);
        const jsonResult = JSON.stringify(result);
        
        fs.writeFile(path.join(__dirname, "db/db.json"), jsonResult, function(err, data) {
            if(err){
                console.log(err);
            }
        var storedNotes = JSON.parse(data);
        res.json(storedNotes);
        });
    });
});

// delete notes
app.delete("api/notes/:id", function(req, res) {
    var note = req.params.id;

    fs.readFile(path.join(__dirname,"db/db.json"), function(err, data) {
        if(err) {
            console.log(err);
        }
        const result = JSON.parse(data);
        result.splice(note,1);

        fs.writeFile(path.join(__dirname,"db/db.json"), JSON.stringify(result), function(err, data) {
            if(err) throw err;
            res.json(result);
        })
    
    })
})


// start server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT)
})

