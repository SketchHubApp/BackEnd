const express = require('express');

const router = express.Router();
const loginController = require('../controller/login_controller');
const userController = require('../controller/user_controller');

// login router
router.get('/login', loginController.loginPage);
router.post("/home", loginController.login);

// logout router    <- sketch_router 로 갈 수 있음

// signUp router
router.get('/signUp', userController.signUpPage);
router.post('/signUp', userController.signUp);

// find ID router
router.get('/findId', loginController.findIdPage);
router.post('/findId', loginController.findId);

// find PW router
router.get('/findPw', loginController.findPwPage);
router.post('/findPw', loginController.findPw);

// update PW router <- find password 랑 같이 구현해놓음
// router.post('/findPw/updatePw', loginController.updatePw);

// cancel router (나가기)


module.exports = router;