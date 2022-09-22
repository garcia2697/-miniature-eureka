const db = require('../db/db.json');
const express = require('express');
const app = express();
const fs = require("fs");
const path = require("path");

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/notes.html'))
});

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
});

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'));
});

module.exports = app;

