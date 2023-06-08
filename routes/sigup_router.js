const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');

//http://localhost:3000/sigup
router.route('/')
    .post((req,res,next) =>  userController.signUp(req,res,next));

module.exports = router;