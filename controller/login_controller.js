const loginService = require('../service/login_service');

exports.login = async (req, res, next) => {
    const {id, pw} = req.body;
    try {
        let auth = await loginService.userAuth(id, pw, next); // user Num 리턴됨
        if (auth) res.render(''); // success login, connect flutter
        else res.redirect('/'); // fail login
    } catch (err) {
        console.error(err);
        next(err);
    }
}