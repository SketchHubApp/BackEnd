const Authentication = require("../models/authentication");

// find user ID
exports.findUser = async (name, birthday, phone) => await Authentication.findOne({
    where: {
        name: name,
        birthday: birthday,
        phone: phone
    }
})

// create authentication
exports.createAuthentication = async (name, email, bitrh, phone, sex, nation) => await Authentication.create({
    name: name,
    email: email,
    birthday: bitrh,
    phone: phone,
    sex: sex,
    nation: nation
});

exports.readAuth = async (no) => await Authentication.findOne({
    where: {
        authentication_id: no
    }
})