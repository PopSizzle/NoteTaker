# Note Taker

This app allows users to type notes to themselves and save those notes for later using JSON storage through local servers. It uses a get function to display saved notes, post functions to upload new notes, and a delete function to remove stored notes once the user no longer wants them to be saved

## Table of Contents

* Installationg and Usage
* Dependencies and Code Snippet
* Languages used
* Author
* License
* Acknowledgements

### Installation and Usage

This app needs to be initialized from the terminal and thereafter is accesible from a browser through localhosts. Anybody who has access to the files can type "node server.js" in the terminal to initiate the server and then can access the app through the browser.

### Dependencies and Code Snippet

This app uses the following dependencies:
npm fs (for reading and writing files)
npm express (for setting up middleware to respond to http requests)
npm path (for routing the files and objects)

Here is an example of the code used to delete a saved note from the archives:

```
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
```

## Languages Used

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Authors

* Sam Poppe 

- [Link to Portfolio Site](https://popsizzle.github.io/Portfolio/)
- [Link to Github](https://github.com/PopSizzle)
- [Link to LinkedIn](https://www.linkedin.com/in/sam-poppe-623281193/)

## License

This project is licensed under the MIT License 

## Acknowledgments

* Shout out to Ana Medrano for help figuring out bugs in this app, and to Jerome Chenette, Kerwin Hy, and Mahisha Gunasekaran for teaching me the skills necessary to build this app.