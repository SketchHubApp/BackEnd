const User = require('../models/user');
const Profile = require('../models/profile');

// read user ID
exports.readUser = async (id) => await User.findOne({
    where: {user_name: id}
})
// read user No
exports.readUserNo = async (no) => await User.findOne({where: {userNo: no}})

// create user
exports.createUser = async (id, pw) => await User.create({
    user_name: id,
    password: pw,
    login_type: 1 // 일단 test
});

// update user password
exports.updateUserPw = async (id, pw) => await User.update({password: pw}, {where: {user_name: id}})

