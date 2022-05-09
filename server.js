const express = require('express');
const fs = require('fs');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.post('/api/notes', (req, res) => {
  let note = req.body;
  let list = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  let noteLength = (list.length).toString();

  note.id = noteLength;
  list.push(note);

  fs.writeFileSync('./db/db.json', JSON.stringify(list));
  res.json(list);
});

// app.delete("/api/notes/:id", function(req, res) {
//   console.log(req.params.id)
// });

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});