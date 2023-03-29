const userService = require('../service/user_service');

// 회원가입
exports.signUp = async (req, res, next) => {
    // const { id, pw, name, email, bitrhday, phone, sex, nation } = req.body;
    // test data
    const {id, pw, name, email, birthday, phone, sex, nation} = {
        id: 'kys1234',
        pw: '1234',
        name: 'kim',
        email: 'kys@gmail.com',
        birthday: '20000411',
        phone: '010-1234-1234',
        sex: 1,
        nation: 'korea'
    }
    try {
        let confirmId = await userService.readUserId(id, next);
        if (!confirmId) {
            // await userService.createUser(id, pw, next)
            //     .then(async () => await userService.createAuthentication(name, email, birthday, phone, sex, nation))
            //     .then(() => res.redirect('/'))
            console.log('1')
            let user = await userService.createUser(id, pw, next);
            req.session.id = user.userNo;
            req.cookies.uid = user.user_name;
            console.log('test')
            console.log(user.userNo, user.user_name)
            await userService.createAuthentication(name, email, birthday, phone, sex, nation);
            req.session.save().then(() => res.redirect('/'))
            // res.redirect('/');
        } else {
            // 중복된 ID가 있을 경우.
            res.redirect('/');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}
exports.signUpPage = (req, res, next) => {
    try {
        res.render('signUp');
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// 일단, id 중복 controller 로 뺌 <- Ajax 로 처리할 건지, 알림으로 처리할 건지 결정해야 함.
exports.confirmId = async (req, res, next) => {
    // const id = req.params.userId; // 이 부분 프론트 확인해줘
    const id = 'test_id';
    try {
        let result = await userService.readUserId(id);
        if (!result) {
            console.log("승인."); // 이거 바꿔야함
        } else {
            console.log("중복된 ID 입니다.");
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// create profile page
exports.createProfilePage = (req, res, next) => {
    try {
        res.render('profile');
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// create profile
exports.createProfile = async (req, res, next) => {
    const {nickname, introduce} = {nickname: '스즈메', introduce: '평점: 4.1'};
    try {
        await userService.createProfile(nickname, introduce, next)
            .then(() => res.redirect('/'))
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// profile 수정 페이지
exports.updateProfilePage = async (req, res, next) => {
    try {
        res.render('updateProfile');
    } catch (err) {
        console.error(err);
        next(err);
    }
}
// profile 수정
exports.updateProfile = async (req, res, next) => {
    const {nickname, introduce} = {nickname: '다이진', introduce: '고양고양이'};
    try {
        await userService.updateProfile(nickname, introduce);
    } catch (err) {
        console.error(err);
        next(err);
    }
}