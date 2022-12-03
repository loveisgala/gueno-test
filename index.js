const express = require('express')
const app = express()

// Middlewares to format to json - for POST/PUT requests
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Sets Router
const t = require('./routes/index')
app.use(t)

// Server up
app.listen(process.env.PORT || 3000, () => {
  console.log('Server running')
})
