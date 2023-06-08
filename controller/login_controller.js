const serveFavicon = require('serve-favicon');
const loginService = require('../service/login_service');
const logoutService = require('../service/logout_service');
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
        console.log(`-------------- \n로그인 시도\n ID: ${req.body.id}\n PW: ${req.body.pw}\n--------------`);
        let auth = await loginService.userAuth(req,res, next); 
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.logout = async(req,res,next) =>{
    try{
        let sessionOut = await logoutService.logout(req,res,next);
        console.log(sessionOut);
    }catch(err){
        res.json({meg:err});
        next(err);
    }
}

