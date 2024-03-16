const express = require('express');
const mongoose = require('mongoose');
const Data = require('./Model.js');

const app = express();


app.post('/sector', async (req, res) => {
  const field = req.body.field; 

  try {
    const filteredValues = await Data.find({"sector":field});
    res.status(200).json(filteredValues);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching distinct values' });
  }
});

module.exports = app;