const userService = require('../service/user_service');

// 회원가입
exports.signUp = async(req, res, next) => {
    // const { id, pw, name, email, bitrhday, sex, nation } = req.body;
    // test data
    const { id, pw, name, email, birthday, sex, nation } = {
        id:'kys',
        pw:'1234',
        name:'kim',
        email:'kys@gmail.com',
        birthday:'20000411',
        sex: 1,
        nation:'korea'
    }

    try{
        let confirmId = await userService.readUserId(id, next);
        if(!confirmId){
            await userService.createUser(id, pw, next)
                .then(async () => await userService.createAuthentication(name, email, birthday, sex, nation))
                .then(()=> res.redirect('/'))
        }
        else{
            // 중복된 ID가 있을 경우.
            res.redirect('/');
        }
    } catch(err){
        console.error(err);
        next(err);
    }
}
exports.signUpPage = (req, res, next) => {
    try{
        res.render('signUp');
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