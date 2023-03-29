const userRouter = require('../routes/user_router');
const loginRouter = require('../routes/login_router');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');

module.exports = async(expressApp)=>{
    dotenv.config();
    expressApp.set('port', process.env.PORT || 3000);
    // expressApp.use((req, res) =>
    //     res.render('test', {
    //         title: require('../package.json').name,
    //         port: expressApp.get('port')
    //     }));
    expressApp.use((err, req, res, next) => {
        console.error(err);
    });
    //http://localhost:3000/login
    expressApp.use('/login', loginRouter);  // login router

    //http://localhost:3000/user
    expressApp.use('/user', userRouter);  // user router

    return expressApp;
}

