const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/api/time', (req, res) => {
  res.json({ time: new Date().toISOString() });
});

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'Guest';
  res.json({ greeting: `Hello, ${name}!` });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
