const router = require('express').Router();
const passport = require('passport');

router.get('/google' , passport.authenticate('google' , {
    scope:['profile']
}));

//callback route for google
router.get('/google/redirect' , (req , res)=>{
    res.send('reached')
});

module.exports = router;