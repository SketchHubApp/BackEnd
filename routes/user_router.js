const express = require('express');
// const User = require('../models/user');

const router = express.Router();
const userController = require('../controller/user_controller');

// create profile
router.get('/profile', userController.createProfilePage);
router.post('/profile', userController.createProfile);

// update profile


// delete profile

module.exports = router;