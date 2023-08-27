const express = require('express')
const app = express()
const port = 5000
const path = require('path')

require('dotenv').config();

console.log(process.env.CLIENT_ID);
console.log(process.env.AUTHORITY);
console.log(process.env.API_KEY);


app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.status(404);
  res.send('<h1>404: Page not found</h1>');
  next();

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
