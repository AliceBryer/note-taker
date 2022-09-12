const express = require("express");
const fs = require("fs");
const noteData = require("./db/db.json");
const app = express();
const port = 3000;
const path = require("path");

app.listen(process.env.PORT || port, () => {
  console.log("app is listening at localhost");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// html routes

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
