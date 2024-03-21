const express = require('express');
const mongoose = require('mongoose');
const Data = require('./Model.js');
const cors=require('cors')
const app = express();

// CORS middleware to allow requests from all origins
app.use(cors());

app.post('/sector', async (req, res) => {
  const sector = req.body.sector; 

  try {
    const distinctTopics = await Data.distinct("topic", { "sector": sector });
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(200).json(distinctTopics);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching distinct values' });
  }
});




app.post('/topic', async (req, res) => {
  const sector = req.body.sector;
  const topic = req.body.topic;

  try {
    const endDate = await Data.findOne({ "sector": sector, "topic": topic }, { end_year: 1, _id: 0 }).sort({ end_year: -1 });
    
    if (endDate) {
      
      res.status(200).json({ endDate: endDate.end_year });
    } else {
      res.status(404).json({ message: 'End date not found for the specified sector and topic' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the end date' });
  }
});

module.exports = app;