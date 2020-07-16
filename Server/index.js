const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
const app = express()
const authRoutes = require('./routes/auth-routes')
const apiRoutes = require('./routes/api-router')
const passport = require('passport')
const cookieSession = require('cookie-session')
const keys = require("./config/keys");
const passportSetup = require('./config/passport-setup');
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use(bodyParser.json())

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth' , authRoutes)
app.use('/api' , apiRoutes)


app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys:[keys.session.cookieKey]
}))

app.get('/', (req, res) => {
    res.send('Hello World!')
    req.logout()
})

const db = keys.mongodb.dbURI

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))