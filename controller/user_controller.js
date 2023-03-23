const userService = require('../service/user_service');
const userRepository = require("../repository/user_repository");

// 회원가입
exports.signUp = async(req, res, next) => {
    const { id, pw, name, email, bitrh, sex, nation } = req.body;
    try{
        await userService.createUser(id, pw)
            .then(async () => await userService.createAuthentication(name, email, bitrh, sex, nation)).then(()=> res.redirect('/'));
    } catch(err){
        console.error(err);
        next(err);
    }
}

// 일단, id 중복 controller 로 뺌 <- Ajax 로 처리할 건지, 알림으로 처리할 건지 결정해야 함.
exports.confirmId = async(req, res, next) => {
    const id = req.params.userId; // 이 부분 프론트 확인해줘
    try{
        let result = await userService.readUserId(id);
        if (result) {
            console.log("승인."); // 이거 바꿔야함
        } else {
            console.log("중복된 ID 입니다.");
        }
    }catch (err) {
        console.error(err);
        next(err);
    }
}