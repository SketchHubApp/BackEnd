const userRouter = require('../routes/user_router');
const loginRouter = require('../routes/login_router');
const logoutRouter = require('../routes/logout_router');
const sigupRouter = require('../routes/sigup_router');
const sketchRouter = require('../routes/sketch_router');
const passport = require('passport');
const express = require('express');
const passportConfig = require('../passport/index.js');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

module.exports = async(expressApp)=>{
    dotenv.config();
    expressApp.use(
        morgan('dev'),
        express.json(),
        express.urlencoded({ extended: false }),  
    );
    expressApp.use(session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET,
        cookie: {
            httpOnly: true,
            secure: false
        },
        name: 'session-cookie'
    }))
    passportConfig();
    expressApp.use(passport.initialize());
    expressApp.use(passport.session());
    expressApp.set('port', process.env.PORT || 8080);
    expressApp.use((err, req, res, next) => {
        console.error(err);
    });

    //http://localhost:8080/login
    expressApp.use('/login', loginRouter);  // login router

    //http://localhost:2080/logout
    expressApp.use('/logout',logoutRouter);
    
    //http://localhost:3000/sigup
    expressApp.use('/sigup',sigupRouter);

    //http://localhost:3000/user
    expressApp.use('/user', userRouter);  // user router

    //http://localhost:3000/sketch
    //expressApp.use('/sketch', sketchRouter);
}

