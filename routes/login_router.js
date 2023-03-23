const express = require('express');

const router = express.Router();
const loginController = require('../controller/login_controller');
const userController = require('../controller/user_controller');

// login router
router.post("/login", loginController.login);

// logout router    <- sketch 쪽으로 갈 수 있음
// router.get

// signUp router
router.post('/signUp', userController.signUp);

// find ID router

// find PW router

// cancel router

module.exports = router;