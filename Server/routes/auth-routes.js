const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:8000";
const User = require("../models/user-model");

router.get("/login/success", (req, res) => {
  if (req.user) {
    User.findById(req.user, function (err, user) {
    }).then((currentUser) => {
      res.json({
        success: true,
        message: "user has successfully authenticated",
        user: currentUser,
        cookies: req.cookies,
      });
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  req.session = null;
  res.clearCookie("express.sid", { path: "/" });
  res.redirect(CLIENT_HOME_PAGE_URL);
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

//callback route for google
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;
