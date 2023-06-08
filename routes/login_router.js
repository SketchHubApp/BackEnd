const express = require('express');
const router = express.Router();
const loginController = require('../controller/login_controller');

//http://localhost:3000/login
router.route("/")
.post(async(req,res,next) => await loginController.login(req,res,next));

module.exports = router;