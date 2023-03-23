const Sequelize = require('sequelize');
const User = require('./user');
const Profile = require('./profile');
const Authentication = require('./authentication');
const SocialLogin = require('./social_login');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const db = {
    sequelize,
    User,
    Profile,
    Authentication,
    SocialLogin
};

User.init(sequelize);
Profile.init(sequelize);
Authentication.init(sequelize);
SocialLogin.init(sequelize);

User.associate(db);
Profile.associate(db);
Authentication.associate(db);
SocialLogin.associate(db);

module.exports = db;
