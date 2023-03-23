const loginService = require('../service/login_service');

exports.loginPage = async (req, res, next) => {
    try {
        res.render('login');
    } catch (err) {
        console.error(err);
        // next(err);
    }
}

exports.login = async (req, res, next) => {
    // const {id, pw} = req.body;
    const { id, pw } = {id:'kys', pw:1234};
    try {
        let auth = await loginService.userAuth(id, pw, next); // user Num 리턴됨
        if (auth) res.render('sketch'); // success login, connect flutter
        else {
            console.log('fail');
            res.redirect('/'); // fail login
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}