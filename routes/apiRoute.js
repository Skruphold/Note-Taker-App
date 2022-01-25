//requiring dependencies.
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {
    // get request reading db.json and sending data to response.
    app.get("/api/notes", (req, res) => {
        console.log("\nExecuting GET notes request");
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        res.json(data);
    });
    // fetching the new note from client assigning it a unique id reading the db.json and pushing the note and writing it in the db.json.
    app.post("/api/notes", (req, res) => {
        const addNote = req.body;
        console.log("\nPOST request - new note: " + JSON.stringify(addNote));
        addNote.id = uuidv4();
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        data.push(addNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        console.log("successfully added note to the db.json file");
        res.json(data);
    });
    // fetching the id to delete re reading the db.json filtering the data and then writing it.
    app.delete("/api/notes/:id", (req, res) => {
        const delNote = req.params.id;
        console.log(`\n Delete note request for id: ${delNote}`);
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        const filterData = data.filter( note => note.id !== delNote );
        fs.writeFileSync('./db/db.json', JSON.stringify(filterData));
        console.log("successfully deleted note to from db.json file");
        res.json(filterData);
    })
}