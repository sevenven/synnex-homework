const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
var app = express();
const { getDb, saveDb } = require('./db');

// parse application/json body
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(express.json())

// get sdk list
app.get('/sdks', async (req, res) => {
  try {
    const db = await getDb();
    res.status(200).json(db.sdks)
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      error: error.message
    })
  }
})

// get an sdk data
app.get('/sdks/:id', async (req, res) => {
  try {
    const db = await getDb();
    const sdk = db.sdks.find(item => item.id === req.params.id);
    if (!sdk) return res.status(404).end();
    res.status(200).json(sdk)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

// add an sdk data
app.post('/sdks', async (req, res) => {
  try {
    const sdk = req.body;
    if (!sdk.clientName) {
      return res.status(422).json({
        error: 'The field clientName is required.'
      })
    }
    const db = await getDb();
    sdk.id = uuidv4();
    sdk.tags = sdk.tags ? sdk.tags.split(' ') : [];
    db.sdks.push(sdk)
    await saveDb(db);
    res.status(200).json(sdk)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

var server = app.listen(3001, function () {
  console.log("Server running at http://localhost:3001/")
})