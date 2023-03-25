const Sequelize = require('sequelize');

module.exports = class Profile extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            profile_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            nickname: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            introduce: {
                type: Sequelize.STRING(200),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Profile',
            tableName: 'profile',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Profile.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userNo' });
    }
};
