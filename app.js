const express = require('express')
const app = express()
const port = 5000
const path = require('path')

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.status(404);
  res.send('<h1>404: Page not found</h1>');
  next();

})

app.get('/api/config', (req, res) => {
  const config = {
    clientId: process.env.CLIENT_ID,
    authority: process.env.AUTHORITY,
    apiKey: process.env.API_KEY
  };
  res.json(config);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
