const express = require('express');

const router = express.Router();
const userController = require('../controller/user_controller');

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// create profile
router.get('/profile', userController.createProfilePage);
router.post('/profile', userController.createProfile); // 일단, 사진 기능은 생략하겠습니다
// router.post('/profile',upload.single('image'), userController.createProfile);

// update profile
router.get('/profile/update', userController.updateProfilePage);
router.post('/profile/update', userController.updateProfile)

// delete profile

module.exports = router;