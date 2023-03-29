const loginService = require('../service/login_service');

// exports.loginPage = async (req, res, next) => {
//     try {
//         res.render('login');
//     } catch (err) {
//         console.error(err);
//         // next(err);
//     }
// }

exports.login = async (req,res,next) => {
    try {
        console.log(req.body);
        let auth = await loginService.userAuth(req.body.id, req.body.pw, next); // user Num 리턴됨
        if (auth) res.send('sketch'); // success login, connect flutter
        else {
            console.log('fail');
            res.send("fail");
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}