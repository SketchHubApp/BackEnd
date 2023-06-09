const Workspace = require('../models/workspace');
const User = require('../models/user');
const UserWorkspace = require('../models/userWorkspace');

// user의 모든 작업 공간 목록 조회
exports.readWorkspaces = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        const userWorkspaces = await UserWorkspace.findAll({
            where: { userNo:id },
            attributes: ['roomId'],
        });
        return  roomIds = userWorkspaces.map((userWorkspace) => userWorkspace.roomId);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

exports.openWorkspace = async (id, roomId) => {
    try {
        // user_workspace_id에 해당하는 데이터 조회
        const userWorkspaces = await UserWorkspace.findAll({where: { userNo:id }});
        // 조회된 모든 데이터에 대해서 반복문 실행
        for (const userWorkspace of userWorkspaces) {
            // userNo과 roomId 값이 일치하는지 확인
            if (userWorkspace.roomId === Number(roomId)) {
                // 일치하는 경우 처리할 로직 작성
                console.log('userNo과 roomId 값이 일치합니다.');
                return userWorkspace;
            } else {
                // 일치하지 않는 경우 처리할 로직 작성
                console.log('userNo과 roomId 값이 일치하지 않습니다.');
            }
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// roomId를 통해 해당 Workspace에 참여하는 User 목록 조회
exports.getWorkspaceUsers = async (roomId) => {
    try {
        const workspace = await Workspace.findByPk(roomId, {
            include: [
                {
                    model: User,
                    as: 'collaborators',
                    attributes: ['userId', 'username', 'email']
                }
            ]
        });
        if (!workspace) {
            throw new Error('Workspace not found');
        }

        const users = workspace.collaborators.map(collaborator => {
            return {
                userId: collaborator.userId,
                username: collaborator.username,
                email: collaborator.email
            };
        });
        return users;
    } catch (err) {
        console.error(err);
        throw err;
    }
};


// 작업 공간 생성 (roomName: 방제목, userNo: 방장, userNoList: 작업자)
exports.createWorkspace = async (roomName, userNo, userNoList) => {
    let transaction;
    try {
        transaction = await Workspace.sequelize.transaction();

        const workspace = await Workspace.create({
            roomName: roomName,
            userNo: userNo
        }, { transaction });

        const userWorkspaceData = userNoList.map(userNo => ({
            roomId: workspace.roomId,
            roomName: workspace.roomName,
            userNo: userNo
        }));
        await UserWorkspace.bulkCreate(userWorkspaceData, { transaction });
        await transaction.commit();

        return workspace;
    } catch (err) {
        if (transaction) await transaction.rollback();
        console.error(err);
        throw err;
    }
};

// workspace 안에 있는 협업자 정보 조회하기
exports.getCollaborators = async (userId, roomName) => {
    try {
        const user = await User.findOne({ where: { user_name: userId } });
        console.log('TEST:', user.userNo);
        const workspace = await UserWorkspace.findAll({ where: { roomName } })
        const result = {};

        workspace.forEach((workspace) => {
            const roomId = workspace.dataValues.roomId;
            const roomName = workspace.dataValues.roomName;
            const userNo = workspace.dataValues.userNo;

            if (!result[roomId]) {
                result[roomId] = {
                    roomName: roomName,
                    userNoList: [],
                };
            }
            result[roomId].userNoList.push(userNo);
        });
        console.log(result)
        return result;
    } catch (err) {
        console.error(err);
    }
}
