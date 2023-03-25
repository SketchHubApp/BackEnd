const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            userNo: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            user_name: { // user id
                type: Sequelize.STRING(50),
                allowNull: false
            },
            password: { // user password
                type: Sequelize.STRING(500),
                allowNull: false
            },
            login_type: { // 0: normal, 1: social
                type: Sequelize.TINYINT,
                allowNull: true // 나중에 바꿔야 함
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'user',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Profile, { foreignKey: 'userId', sourceKey: 'userNo', onDelete: 'cascade' });
        db.User.hasMany(db.SocialLogin, { foreignKey: 'userId', sourceKey: 'userNo', onDelete: 'cascade' });
        db.User.hasMany(db.Authentication, { foreignKey: 'userId', sourceKey: 'userNo', onDelete: 'cascade' });
    }
};
