const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const port = 1337

const app = express()

app.use(cors())
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodedParser)

const dbUrl = 'mongodb+srv://stasian-admin:2022MeladzeValery@cryptohub.xjfgo.mongodb.net/CryptoHub?retryWrites=true&w=majority'

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true})
.then(res => {
  app.listen(process.env.PORT), 
  () => console.log('Server is live')
})
.catch(err => console.log(err.message))

function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token']?.split(' ')[1]
  if (token) {
    jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
      if (err) return res.json({
        isLoggedIn: false,
        message: "Failed to authenticate"
      })
      req.user = {}
      req.user.id = decoded.id
      req.user.username = decoded.username
      next()
    })
  } else {
    res.json({message: "Incorrect token given", isLoggedIn: false})
  }
}

app.get('/getUsername', verifyJWT, (req, res) => {
  res.json({isLoggedIn: true, username: req.user.username})
})

app.post('/register', async (req, res) => {
  const user = req.body

  const takenName = await User.findOne({ username: user.username })
  const takenEmail = await User.findOne({ email: user.email })

  if ( takenName || takenEmail ) {
    res.json({message: 'Username or email were already taken'})
  } else {
    user.password = await bcrypt.hash(req.body.password, 5)

    const dbUser = new User({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password 
    })

    dbUser.save()
    res.json({message: 'User saved successfully'})
  }
})

app.post('/login', (req, res) => {
  const userLoggingIn = req.body
  User.findOne({username: userLoggingIn.username})
  .then(dbUser => {
    if (!dbUser) {
      return res.json({message: "invalid usernmae or password"})
    }
    bcrypt.compare(userLoggingIn.password, dbUser.password)
    .then(isCorrect => {
      if (isCorrect) {
        const payload = {
          id: dbUser._id,
          username: dbUser.username
        }
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {expressIn: 86400},
          (err, token) => {
            if (err) return res.json({message: err})
            return res.json({
              message: "Success",
              token: "Bearer" + token
            })
          }
        )
      } else {
        return res.json({message: "Invalid username or password"})
      }
    })
  })
})

app.listen(port, () => console.log("Server is running on port 1337"))