
const express = require('express');
const app = require('./App.js');
const mongoose = require('mongoose');
const port = process.env.PORT||3000; 


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const DBURL='mongodb+srv://bhavukgoyal:mymongo138@cluster0.bt4vwxx.mongodb.net/dashboard';
mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('connected to database'));


app.listen(port, () => console.log(`App listening on port ${port}!`));