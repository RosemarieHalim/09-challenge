const fs = require('fs');
const path = require('path');

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'))
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

app.post('/api/notes', (req, res) => {
  let note = req.body;
  let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  let noteLength = (noteList.length).toString();

  note.id = noteLength;
  noteList.push(note);

  fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
  res.json(noteList);
});

app.delete('/api/notes/:id', (req, res) => {
  let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  let noteID = (req.params.id).toString();

  noteList = noteList.filter(selected => {
    return selected.id != noteID;
  })

  fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
  res.json(noteList);
});