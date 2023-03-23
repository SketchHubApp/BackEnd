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