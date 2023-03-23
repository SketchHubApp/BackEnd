const User = require('../models/user');
const Profile = require('../models/profile');
const Authentication = require('../models/authentication');

// read user ID
exports.readUser = async (id) => await User.findOne({
    where: { user_name : id }
})

// crate user
exports.createUser = async (id, pw) => await User.create({
    user_name: id,
    password: pw,
    login_type:1 // 일단 test
});

// crate authentication
exports.createAuthentication = async (name, email, bitrh, sex, nation) => await Authentication.create({
    name: name,
    email: email,
    birthday: bitrh,
    sex: sex,
    nation: nation
});