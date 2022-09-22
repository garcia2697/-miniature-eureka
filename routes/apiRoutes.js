const db = require('../db/db.json');
const express = require('express');
const app = express();
const fs = require("fs");
const path = require("path");

app.route('/notes')
  .get(function (req, res) { // Grabs the notes. This gets updated for every new and deleted note.
    res.json(db);
  })
  .post(function (req, res) {
    let dbPath = path.join(__dirname, "../db/db.json");
    let newNote = req.body;
    let testId = 99; // Makes the test note the 'default' note

    for(let i = 0; i<db.length; i++) {
      let singleNote = db[i];

      if(singleNote.id > testId) {
        // Makes sure that testId is always the highest numbered id
        testId = singleNote.id;
      }
    }
    newNote.id = testId + 1; // The new note's ID gets pushed to the database
    db.push(newNote);

    fs.writeFile(dbPath, JSON.stringify(db), (err) => {
      if(err) { // Checks for errors
        return console.log(err);
      } console.log('Your note has been saved.');
    }); // Responds with the newly written note.
    res.json(newNote); 
  });

  app.delete('/notes/:id', (req, res) => {
    let dbPath = path.join(__dirname, '../db/db.json');
    //if the id matches the requested id to delete, remove that note.
    for(let i = 0; i < db.length; i++){
      if(db[i].id == req.params.id) {
        db.splice(i, 1);
        break;
      }
    }

    // Write the database file after changes have been made
    fs.writeFileSync(dbPath, JSON.stringify(db), (err) => {
      if(err){
        return console.log(err);
      } else {
        console.log('Your note has been deleted.');
      }
    });
    // Respond with the updated database
    res.json(db);
  });

module.exports = app;