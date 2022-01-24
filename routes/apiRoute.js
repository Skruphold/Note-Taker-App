// const { response } = require('express');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {
    app.get("/notes", (req, res) => {
        console.log("\nExecuting GET notes request");
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        res.json(data);
    })
}