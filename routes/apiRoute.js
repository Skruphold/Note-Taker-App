// const { response } = require('express');
const { response } = require('express');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {
    app.get("/api/notes", (req, res) => {
        console.log("\nExecuting GET notes request");
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        res.json(data);
    });

    app.post("/api/notes", (req, res) => {
        const addNote = req.body;
        console.log("\nPOST request - new note:" + JSON.stringify(addNote));
        addNote.id = uuidv4();
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        data.push(addNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        console.log("successfully added note to the db.json file");
        res.json(data);
    })
}