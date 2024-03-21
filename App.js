const express = require('express');
const mongoose = require('mongoose');
const Data = require('./Model.js');
const cors=require('cors')
const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization", "X-Request-With"],
}));

app.post('/sector', async (req, res) => {
  const sector = req.body.sector; 

  try {
    const distinctTopics = await Data.distinct("topic", { "sector": sector });
    res.header('Access-Control-Allow-Origin', '*');
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