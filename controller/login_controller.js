const loginService = require('../service/login_service');
const jsonUtile = require("../utile/jsonUtilty");

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
        //res.json(req.body);
        console.log(req.body);
        let auth = await loginService.userAuth(req.body.id, req.body.pw, next); // user Num 리턴됨
        if (auth) {
            jsonUtile.setHeader(200)
            jsonUtile.setResult({
                result : "sketch",
            });
            res.json(jsonUtile.getJosn());
        } // success login, connect flutter
        else {
            jsonUtile.setHeader(200)
            jsonUtile.setResult({
                err : "faill",
            });
            res.json(jsonUtile.getJosn());
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

