const express = require('express')
const bodyParser = require('body-parser')
const User = require('./schema/user')

// Initialize app
const app = express()
const port = 8080

// Defining parsing
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routing
const router = express.Router()

// root
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Express!'
  })
})

router.get('/user', (req, res) => {
  const users = User.find((err, docs) => {
    if (err) res.json({ message: err })
    res.json({
      data: docs
    })
  })
})

router.post('/user', (req, res) => {
  const errors = []
  const { username, email } = req.body
  if (!username) {
    errors.push('Username field not found')
  }
  if (!email) {
    errors.push('Email field not found')
  }
  if (errors.length > 0) {
    res.json(400, {
      errors
    })
  }
  const user = new User({ username, email })
  user.save((err) => {
    if (err) res.json({ message: err })
    res.json(201, {
      user
    })
  })
})

// Prefix
app.use('/api', router)

// Listening
app.listen(port)
console.log(`API listening on port ${port}`)