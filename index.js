const express = require('express');

const port = 8004;

const app = express();

const db = require('./config/mondoose');

app.use(express.urlencoded());

const passport = require('passport');
const passportlocal = require('./config/passport');
const session = require('express-session');

app.use(session({
    name: 'admin',
    secret: 'admin_api',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 100 * 100 * 60
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./router/coachrouter'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    } else {
        console.log("server is running : ", port);
    }
});