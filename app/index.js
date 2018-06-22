const express = require('express')
const bodyParser = require('body-parser')
const User = require('./schema/user')
const multer = require('multer')
const upload = multer({ dest: 'uploads/'})

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

router.get('/user/:id', (req, res) => {
  const { id } = req.params
  const users = User.findById({ _id: id }, (err, user) => {
    if (err) res.json({ message: err })
    res.json({
      user
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

router.post('/upload', upload.array('files', 3), (req, res, next) => {
  console.log(req)
  res.json({
    message: 'Upload'
  })
})

router.delete('/user/:id', (req, res) => {
  const { id } = req.params
  const users = User.findByIdAndRemove({ _id: id }, (err) => {
    if (err) res.json({ message: err })
    res.json({
      message: `User with id ${id} has been removed.`
    })
  })
})

// Prefix
app.use('/api', router)

// Listening
app.listen(port)
console.log(`API listening on port ${port}`)