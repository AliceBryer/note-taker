"use strict";

const noteData = require("../db/db.json");
const fs = require("fs");
const path = require("path");

app.get("/api/notes", (req, res) => res.json(noteData));

app.post("/api/notes", (req, res) => {
  noteData.push(req.body);

  for (let i = 0; i < noteData.length; i++) {
    noteData[i].id = i + 1;
  }

  fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
    if (err) throw err;
    console.log("Updated!");
  });
  res.json(true);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  let index;
  for (let i in noteData) {
    if (id === noteData[i].id) {
      index = i;
    }
  }
  noteData.splice(index, 1);
  for (let i in noteData) {
    noteData[i].id = i;
  }
  fs.writeFile(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(noteData),
    (err) => {
      if (err) throw err;
    }
  );
  res.json(true);
});

module.exports = apiRoutes;
