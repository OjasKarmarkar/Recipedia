const router = require('express').Router();
const passport = require('passport');

router.get('/google' , passport.authenticate('google' , {
    scope:['profile']
}));

//callback route for google
router.get('/google/redirect' , passport.authenticate('google') ,(req , res)=>{
    console.log(req.user)
    res.send(req.user)
});

module.exports = router;