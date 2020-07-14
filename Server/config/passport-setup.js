const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require('./keys')

console.log(keys.google.clientID)

passport.use(new GoogleStrategy({
    // google strat
    callbackURL: '/auth/google/redirect',
    clientID: '826748210888-knan7uahchf4keet0v6b7bfhj01ka10j.apps.googleusercontent.com',
    clientSecret: '34uE-VLB6FSxrWXrQLLX9Nl4'
}, () => {
  //passport callback
}))
