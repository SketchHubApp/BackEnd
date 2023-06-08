const Sequelize = require('sequelize');

module.exports = class Workspace extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                roomId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                roomName: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                userNo: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'Workspace',
                tableName: 'workspaces',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }

    static associate(db) {
        db.Workspace.belongsTo(db.User, { foreignKey: 'userNo', targetKey: 'userNo' });
        db.Workspace.belongsToMany(db.User, {
            through: db.UserWorkspace,
            foreignKey: 'roomId',
            otherKey: 'userNo',
        });
    }
};
