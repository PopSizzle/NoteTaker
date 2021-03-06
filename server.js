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

// index.js location
app.get("/assets/js/index.js", function(req, res) {
    res.sendFile(path.join(__dirname, "public/assets/js/index.js"))
});

// styles.css location
app.get("/assets/css/styles.css", function(req, res) {
    res.sendFile(path.join(__dirname, "public/assets/css/styles.css"))
})

// notes.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

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
    fs.readFile(path.join(__dirname, "db/db.json"), function(err, data) {
        if (err) {
            return console.log(err);
        }
        console.log("Success!");
        
        const result = JSON.parse(data);
        console.log(result);
        note.id = result.length;
        result.push(note);
        const jsonResult = JSON.stringify(result);
        console.log(jsonResult);
        
        fs.writeFile(path.join(__dirname, "db/db.json"), jsonResult, function(err, data) {
            if(err) throw err;
        // var storedNotes = JSON.parse(data);
        res.json(jsonResult);
        });
    });
});

// delete notes
app.delete("/api/notes/:id", function(req, res) {
    var thisNote = parseInt(req.params.id);
    console.log(thisNote);
    fs.readFile(path.join(__dirname,"db/db.json"), function(err, data) {
        if(err) {
            console.log(err);
        }
        console.log("success");
        const result = JSON.parse(data);
        
        const newResult = result.filter(note => note.id !== thisNote);
        console.log(newResult);

        fs.writeFile(path.join(__dirname,"db/db.json"), JSON.stringify(newResult), function(err, data) {
            if(err) throw err;
            res.json(newResult);
        })
    
    })
})


// start server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT)
})

