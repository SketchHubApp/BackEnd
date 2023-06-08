const Sequelize = require('sequelize');

module.exports = class UserWorkspace extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                user_workspace_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                roomId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
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
                modelName: 'UserWorkspace',
                tableName: 'user_workspace',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }

    static associate(db) {
        UserWorkspace.belongsTo(db.User, { foreignKey: 'userNo', onDelete: 'cascade' });
        UserWorkspace.belongsTo(db.Workspace, { foreignKey: 'roomId', onDelete: 'cascade' });
    }
};
