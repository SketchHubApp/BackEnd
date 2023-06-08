const userRepository = require('../repository/user_repository');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jsonUtile = require('../utile/jsonUtilty')

// 로그인 인증
exports.userAuth = async(req,res, next) =>  
    passport.authenticate('local', async (authError,user,info)=>{
        try {
            console.log("로그인 인증 중..");
            if (user) req.login(user,loginError => {
                console.log(user.dataValues);
                jsonUtile.setHeader(200)
                jsonUtile.setResult({
                    message:"회원 : "+ user.dataValues.user_name+ " 로그인 성공", 
                })
                res.json(jsonUtile.getJosn());
                console.log("로그인 완료");
            });
            else{
                //console.log(user)
                jsonUtile.setHeader(401)
                jsonUtile.setResult({
                err:{message:info}
                })
                res.json(jsonUtile.getJosn());
                console.log("로그인 실패");
            }
        } catch(err){
            console.error(err);
            next(err);
            return err;
        }
})(req,res,next);