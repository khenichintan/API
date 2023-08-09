const express = require('express');

const router = express.Router();

const passport = require('passport');

const coachcontroller = require('../controller/coachcontroller');

router.get('/loginfail', (req, res) => {
    return res.json({ status: 400, msg: "login first ..." })
})

router.post('/register', coachcontroller.register);

router.post('/login', coachcontroller.login);

router.get('/profile', passport.authenticate('jwt', { failureRedirect: '/loginfail' }), coachcontroller.profile);

router.post('/changepassword', passport.authenticate('jwt', { failureRedirect: "/loginfail" }), coachcontroller.changepassword)

router.use('/cricketer', require('./api/cricketer/cricketrouter'));

module.exports = router