const Sequelize = require('sequelize');
const User = require('./user');
const Profile = require('./profile');
const Authentication = require('./authentication');
const SocialLogin = require('./social_login');
const Workspace = require('./workspace');
const UserWorkspace = require('./userWorkspace');

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
    SocialLogin,
    Workspace, // Workspace 모델 추가
    UserWorkspace
};

User.init(sequelize);
Profile.init(sequelize);
Authentication.init(sequelize);
SocialLogin.init(sequelize);
Workspace.init(sequelize); // Workspace 모델 초기화
UserWorkspace.init(sequelize);

User.associate(db);
Profile.associate(db);
Authentication.associate(db);
SocialLogin.associate(db);
Workspace.associate(db); // Workspace 모델 관계 설정
UserWorkspace.associate(db)

module.exports = db;
