require('dotenv').config();

const express = require('express');
const app = express();
const port = 5000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/config', (req, res) => {
  res.json({
    clientId: process.env.CLIENT_ID,
    authority: process.env.AUTHORITY,
    apiKey: process.env.API_KEY
  });
});

app.use((req, res, next) => {
  res.status(404);
  res.send('<h1>404: Page not found</h1>');
  next();
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
