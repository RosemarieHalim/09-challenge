const express = require('express');
const fs = require('fs');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'))
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

app.post('/api/notes', (req, res) => {
 
});

app.delete('/api/notes/:id', (req, res) => {
  
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});