const express = require('express');

const router = express.Router();
const loginController = require('../controller/login_controller');
const userController = require('../controller/user_controller');

// login router
//router.get('/login', loginController.loginPage);
router.route("/")
.post(async(req,res,next)=> await loginController.login(req,res,next));
//router.post(async(req,res,next) => await loginController.login(req,res,next));

// logout router    <- sketch 쪽으로 갈 수 있음

// signUp router

router.route('/signUp')
    .get((req,res,next) => userController.signUpPage(req,res,next))
    .post((req,res,next) =>  userController.signUp(req,res,next));

// find ID router


// find PW router

// cancel router

module.exports = router;