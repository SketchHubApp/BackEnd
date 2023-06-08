const express = require('express');
// const User = require('../models/user');
const router = express.Router();
const userController = require('../controller/user_controller');
const { route } = require('./login_router');



//find user  pw using user-email , id
//http://localhost:2022/user/:eamill/:id
router.get("/:email/:id", async (req, res, next) => {
    await userController.findPw(req,res,next);
  });

//find user id  using user-email
//http://localhost:2022/user/:eamill
router.get("/:email",async (req,res,next)=>{
    await userController.findId(req,res,next);
});

module.exports = router;