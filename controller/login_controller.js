const loginService = require('../service/login_service');
const userService = require('../service/user_service');

// login page
exports.loginPage = async (req, res, next) => {
    try {
        res.render('login');
    } catch (err) {
        console.error(err);
        next(err);
    }
}
// login
exports.login = async (req, res, next) => {
    // const {id, pw} = req.body;
    const id = req.body.id;
    const pw = req.body.pw;
    // const {id, pw} = {id: 'kys', pw: '1234'};
    console.log(id, pw);
    try {
        let auth = await loginService.userAuth(id, pw, next); // user Num 리턴됨
        if (auth) {
            // res.session = ;
            res.render('sketch'); // success login, connect flutter
        } else {
            console.log('fail');
            res.redirect('/'); // fail login
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}
// find id page
exports.findIdPage = async (req, res, next) => {
    try {
        res.render('findId');
    } catch (err) {
        console.error(err);
        next(err);
    }
}
// find id (name, phone number)
exports.findId = async (req, res, next) => {
    // const {name, phone, birthday} = req.body;
    // test data
    const {name, phone, birthday} = {name: 'kim', phone: '010-1234-1234', birthday: '20000411'}
    try {
        let user = await userService.findId(name, phone, birthday, next);
        if (user) {
            console.log(user.user_name); // user ID
            res.redirect('/');
        } else {
            console.log("등록되지 않은 ID");
            res.redirect('/');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// find password page
exports.findPwPage = async (req, res, next) => {
    try {
        res.render('findPw');
    } catch (err) {
        console.error(err);
        next(err);
    }
}
// find password (name, phone number)
exports.findPw = async (req, res, next) => {
    // const { id, name, birthday } = req.body;
    const {id, name, birthday} = {id: 'kys', name: 'kim', birthday: '20000411'};
    try {
        let user = await userService.findPw(id, name, birthday, next);
        if (user) {
            let newPw = '1234';
            console.log(user.password);
            await userService.updatePw(user.user_name, newPw, next);
            res.redirect('/');
        } else {
            console.log('무언가 잘못 입력함..');
            res.redirect('/');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}
// ********** 비밀번호 수정은 생각해봐야함 **********
// // update password
// exports.updatePw = async (req, res, next) => {
//     // const newPw = req.body;
//     const newPw = '1234';
//     const userId = req.cookies.userNo;
//     try {
//         console.log(userId);
//         // let result = await userService.updatePw(newPw, next);
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// }