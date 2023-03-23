const path = require('path');

const dotenv = require('dotenv');
const favicon = require('serve-favicon');

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const nunjucks = require('nunjucks');
const { sequelize } = require('./models');

const userRouter = require('./routes/user_router');
const loginRouter = require('./routes/login_router');
// const indexRouter = require('./routes');


dotenv.config();

const app = express();
app.set('port', process.env.PORT || 3000);

app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
    express: app,
    watch: true,
});

sequelize.sync({ force: false })
  .then(() => console.log('Database connection successful!!'))
  .catch(err => console.error(err));

app.use(favicon(path.join(__dirname, 'public/images', 'logo.jpg')));

app.use(
    morgan('dev'),
    express.static(path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded({ extended: false }),

    cookieParser(process.env.SECRET),
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET,
        cookie: {
            httpOnly: true,
            secure: false
        },
        name: 'session-cookie'
    })
);

app.use('/', loginRouter);  // login router
app.use('/user', userRouter);  // user router

app.use((req, res) =>
    res.render('test', {
        title: require('./package.json').name,
        port: app.get('port')
    }));
    
app.use((err, req, res, next) => {
    console.error(err);
    // res.status(500).send(err);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'port waiting...');
});
