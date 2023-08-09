const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const jwtExtract = require('passport-jwt').ExtractJwt;

const coach = require('../model/coachmodel');
const cricket = require('../model/cricketermodel')

const opts = {
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'Coach'
}

const opts_cricket = {
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'cricketer'
}

passport.use(new jwtStrategy(opts, async(user, done) => {
    let data = await coach.findOne({ email: user.data.email });
    if (data) {
        if (data.password == user.data.password) {
            done(null, data);
        } else {
            done(null, false);
        }
    } else {
        done(null, false);
    }
}));

passport.use('cricketer', new jwtStrategy(opts_cricket, async(user, done) => {
    let data = await cricket.findOne({ email: user.data.email });
    if (data) {
        if (data.password == user.data.password) {
            done(null, data);
        } else {
            done(null, false);
        }
    } else {
        done(null, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async function(id, done) {
    let AD = await coach.findById(id);
    // console.log(AD);
    if (AD) {
        return done(null, AD)
    } else {
        let coachData = await cricket.findById(id);
        if (coachData) {
            return done(null, coachData);
        } else {
            return done(null, false);
        }
    }
});

passport.setAuthnticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role == 'Coach') {
            res.locals.admin = req.user;
        } else {
            res.locals.faculty = req.user;
        }
    }
    next();
}

module.exports = passport;