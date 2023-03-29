const userRepository = require('../repository/user_repository');
const authRepository = require('../repository/auth_repository');
const bcrypt = require('bcrypt');
const multer = require('multer');

// 회원가입 ID, PW 생성
exports.createUser = async (id, pw, next) => {
    try {
        // pw 암호화
        const cryptoPassword = await bcrypt.hash(pw, 8);
        return await userRepository.createUser(id, cryptoPassword);
    } catch (err) {
        console.error(err);
        next(err);
    }
}
// 회원가입 Authentication 생성
exports.createAuthentication = async (name, email, bitrh, phone, sex, nation, next) => {
    try {
        await authRepository.createAuthentication(name, email, bitrh, phone, sex, nation);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// ID 중복 검사
exports.readUserId = async (id, next) => {
    try {
        return await userRepository.readUser(id);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// ID 찾기
exports.findId = async (name, phone, birthday, next) => {
    try {
        let user = await authRepository.findUser(name, birthday, phone);
        return await userRepository.readUserNo(user.authentication_id);
        // error: 위에 user.userNo 으로 찾아야되는데 userNo 값이 NULL 로 들어가서 다시 설정해야함!!!
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// 비밀번호 찾기
exports.findPw = async (id, name, birthday, next) => {
    try {
        let user = await userRepository.readUser(id);
        let userAuth = await authRepository.readAuth(user.userNo);
        if (userAuth.name === name && userAuth.birthday === birthday) return user;
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// 비밀번호 수정
exports.updatePw = async (userId, newPw, next) => {
    try {
        let newHashPw = await bcrypt.hash(newPw, 8);
        await userRepository.updateUserPw(userId, newHashPw);
    } catch (err) {
        console.error(err);
        next(err);
    }
}
// 프로필 생성
exports.createProfile = async (nickname, introduce, next) => {
    try {
        await userRepository.createProfile(nickname, introduce);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.updateProfile = async (nickname, introduce, next) => {
    try {
        id = '1' // 세션 정보 넣기
        await userRepository.updateProfile(nickname, introduce, id);
    } catch (err) {
        console.error(err);
        next(err);
    }
}