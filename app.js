const express = require('express')

const logsController = require('./controllers/logsController')

const app = express()


// Middleware

app.use(express.json())

app.use('/logs', logsController)


// Home Route
app.get('/', (req, res) => {
    res.send("welcome to the captain's log")
})


app.get('*', (req, res) => {
    res.status(404).send('404: Page not found');
  });

module.exports = app


