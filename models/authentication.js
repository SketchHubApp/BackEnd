const Sequelize = require('sequelize');

module.exports = class Authentication extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            authentication_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            birthday: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            sex: {
                type: Sequelize.TINYINT,
                allowNull: false
            },
            nation: {
                type: Sequelize.STRING(50),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Authentication',
            tableName: 'authentication',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Authentication.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userNo' });
    }
};
