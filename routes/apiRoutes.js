const db = require('../db/db.json');
const express = require('express');
const app = express();
const fs = require("fs");
const path = require("path");


// route for the notes page
app.route('/notes')

  // Recieves the notes in the notes page
  .get(function (req, res) { 
    res.json(db);
  })

  // Posts the message into the database
  .post(function (req, res) {
    let dataPath = path.join(__dirname, "../db/db.json");
    let noteText = req.body;
    
    db.push(noteText);

    fs.writeFile(dataPath, JSON.stringify(db), (err) => {
      if(err) { 
        return console.log(err);
      } console.log('Saved your notes');
    }); 
    res.json(noteText); 
  });


  // deletes the posted notes
  app.delete('/notes/:id', (req, res) => {
    let dataPath = path.join(__dirname, '../db/db.json');
   
    for(let i = 0; i < db.length; i++){
      if(db[i].id == req.params.id) {
        db.splice(i, 1);
        break;
      }
    }

    
    fs.writeFileSync(dataPath, JSON.stringify(db), (err) => {
      if(err){
        return console.log(err);
      } else {
        console.log('Your note has been deleted.');
      }
    });
    
    res.json(db);
  });

module.exports = app;