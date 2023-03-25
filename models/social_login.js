const Sequelize = require('sequelize');

module.exports = class SocialLogin extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            social_login_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            social_code: {
                type: Sequelize.TINYINT,
                allowNull: false
            },
            external_id: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            access_token: {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'SocialLogin',
            tableName: 'social_login',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.SocialLogin.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userNo' });
    }
};
