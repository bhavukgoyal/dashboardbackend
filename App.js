const express = require('express');
const mongoose = require('mongoose');
const Data = require('./Model.js');
const cors=require('cors')
const app = express();

// CORS middleware to allow requests from all origins
app.use(cors());
app.use(express.json());

app.post('/sector', async (req, res) => {
  const sec = req.body.sector; 

  try {
    const distinctTopics = await Data.distinct("topic", { sector: sec });
    
    res.status(200).json(distinctTopics);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching distinct values' });
  }
});




app.post('/topic', async (req, res) => {
  const sect = req.body.sector;
  const top = req.body.topic;

  try {
    const distinctDates = await Data.distinct("end_year", { sector: sect,topic:top })
    res.status(200).json(distinctDates);

  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the end date' });
  }
});

app.post('/final', async (req, res) => {
  const sect = req.body.sector;
  const top = req.body.topic;
const ed=req.body.end_year;
  try {
    const results = await Data.find({ sector: sect,topic:top,end_year:ed })
    res.status(200).json(results);

  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the end date' });
  }
});


module.exports = app;