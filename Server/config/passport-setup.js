const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user.id);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // google strat
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({ googleID: profile.id }).then((currentUser) => {
        if (currentUser) {
          done(null, currentUser);
          // check if user exists already
        } else {
          new User({
            username: profile.displayName,
            googleID: profile.id,
            profilePic: profile._json.picture,
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
              //console.log("new User" + newUser);
            });
        }
      });

      //passport callback
    }
  )
);
