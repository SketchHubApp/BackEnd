const userRepository = require('../repository/user_repository');
const bcrypt = require('bcrypt');

// 회원가입 ID, PW 생성
exports.createUser = async(id, pw, next) => {
    try {
        // pw 암호화
        const cryptoPassword = await bcrypt.hash(pw, 8);
        await userRepository.createUser(id, cryptoPassword);
    } catch(err){
        console.error(err);
        next(err);
    }
}
// 회원가입 Authentication 생성
exports.createAuthentication = async(name, email, bitrh, sex, nation, next) => {
    try {
        await userRepository.createAuthentication(name, email, bitrh, sex, nation);
    } catch(err){
        console.error(err);
        next(err);
    }
}
// ID 중복 검사
exports.readUserId = async(id, next) => {
    try {
        return await userRepository.readUser(id);
    } catch (err) {
        console.error(err);
        next(err);
    }
}
exports.findUserIDByEmail= async(email,next)=>{
    try{
        return await userRepository.readUserByEmail(email)
    }catch{
        return null;
    }
}
exports.findUserPWUsingID = async(email,id,next)=>{
    try{
       let user =  await userRepository.readUserById(id);
       let userName = await userRepository.readUserByEmail(email);
       if(userName.name == user.user_name){
           return {
               status:200,
               message:"비밀번호 재설정 링크",
               url:"http://localhost:2022/change-password",
            };
       }else{
           return {
            status:400,
            message:"정보가 틀립니다."
         };
       }
    }catch{
        return {
            status:400,
            message:"정보가 틀립니다."
         };
    }

}