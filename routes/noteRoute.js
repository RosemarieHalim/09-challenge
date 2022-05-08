const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'))
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

router.post('/api/notes', (req, res) => {
  let note = req.body;
  let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  let noteLength = (noteList.length).toString();

  note.id = noteLength;
  noteList.push(note);

  fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
  res.json(noteList);
});

router.delete('/api/notes/:id', (req, res) => {
  let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  let noteID = (req.params.id).toString();

  noteList = noteList.filter(selected => {
    return selected.id != noteID;
  })

  fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
  res.json(noteList);
});

module.exports = router;