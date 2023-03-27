const express = require('express');

const router = express.Router();
const userController = require('../controller/user_controller');
const multer = require('multer');

const upload = multer({
    dest: 'uploads/'
});

// create profile
router.get('/profile', userController.createProfilePage);
router.post('/profile',upload.single('image'), userController.createProfile);
// router.post('/profile',upload.single('image'), (req, res) => console.log(req.file));

// update profile


// delete profile

module.exports = router;