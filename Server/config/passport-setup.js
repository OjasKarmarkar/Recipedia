const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

console.log(keys.google.clientID);

passport.use(
  new GoogleStrategy(
    {
      // google strat
      callbackURL: "/auth/google/redirect",
      clientID:
        "826748210888-knan7uahchf4keet0v6b7bfhj01ka10j.apps.googleusercontent.com",
      clientSecret: "34uE-VLB6FSxrWXrQLLX9Nl4",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then((currentUser) => {
        if (currentUser) {
            // check if user exists already
        } else {
          new User({
            username: profile.displayName,
            googleID: profile.id,
            profilePic: profile._json.picture,
          })
            .save()
            .then((newUser) => {
              //console.log("new User" + newUser);
            });
        }
      });

      //passport callback
    }
  )
);
