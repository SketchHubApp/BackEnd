const express = require('express');
const router = express.Router();
const loginController = require('../controller/login_controller');


//http://localhost:1080/logout
router.get("/",(req,res,next) => loginController.logout(req,res,next));

module.exports = router;