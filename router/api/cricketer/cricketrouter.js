const express = require('express');

const router = express.Router();

const passport = require('passport');

const cricketer = require('../../../model/cricketermodel')

const cricketercontroller = require('../../../controller/api/cricketer/cricketercontroller');

router.get('/loginfail', async(req, res) => {
    return res.json({ status: 500, msg: "login frist" })
});

router.post('/register', cricketer.uploadAvatar, passport.authenticate('jwt', { failureRedirect: '/loginfail' }), cricketercontroller.register);

router.post('/cricketerlogin', cricketercontroller.cricketerlogin);

router.get('/cricketerprofile', passport.authenticate('cricketer', { failureRedirect: '/loginfail' }), cricketercontroller.cricketerprofile);

router.get('/allcricketerdetail', passport.authenticate('jwt', { failureRedirect: '/loginfail' }), cricketercontroller.allcricketerdetail)

router.put('/cricketerupdate/:id', passport.authenticate('cricketer', { failureRedirect: '/loginfail' }), cricketercontroller.cricketerupdate);

router.post('/changepassword', passport.authenticate('cricketer', { failureRedirect: '/loginfail' }), cricketercontroller.changepassword)

module.exports = router