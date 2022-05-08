const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/noteRoute')(app);

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});