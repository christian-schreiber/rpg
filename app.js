const express = require('express')
const app = express()
const port = 5000
const path = require('path')

const CLIENT_ID = 'db788f68-6a9c-4a34-b3e6-0a2adca36b1c'
const AUTHORITY = 'https://login.microsoftonline.com/630a260f-04bd-4d65-a04d-f922f6c2c4a0'
const API_KEY = '8b7e4fdf256345c7ba89396c193734e8';


app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.status(404);
  res.send('<h1>404: Page not found</h1>');
  next();

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
