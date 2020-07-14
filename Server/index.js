const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
const app = express()
const authRoutes = require('./routes/auth-routes')
const config = require('config');
const passportSetup = require('./config/passport-setup')
const passport = require('passport')
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth' , authRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const db = config.get('mongoURI');

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))