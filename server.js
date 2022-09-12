const express = require("express");
const fs = require("fs");
const noteData = require("./db/db.json");
const app = express();
const port = 3000;
const path = require("path");
const uniqid = require("uniqid");
const router = require("express").Router;

app.listen(process.env.PORT || port, () => {
  console.log("app is listening at localhost");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// post routes

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uniqid();
  noteData.push(newNote);
  console.log(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(noteData), (err) => {
    if (err) throw err;
    console.log("Saved!");
  });
});
