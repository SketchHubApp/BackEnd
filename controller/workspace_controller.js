const workspaceService = require("../service/workspace_service");
const jsonUtile = require("../utile/jsonUtilty");

// 모든 작업 공간 가져오기
exports.getWorkspaces = async (req,res,next) => {
    try {
        const id = req.query.id;
        // 작업 가져오기 및 필요한 작업 수행
        const workspaces = await workspaceService.getWorkspaces(id);
        console.log('workspaces list: '+ workspaces)
        // workspaces.forEach((workspace) => { console.log(workspace) })
        // res.json(workspaces);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// 작업 공간 열기
exports.openWorkspace = async (req, res, next) => {
    try {
        const { id, roomId } = req.query
        const workspace = await workspaceService.openWorkspace(id, roomId);

        res.json(workspace);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// 작업 공간 생성하기
exports.createWorkspace = async (req,res,next) => {
    try {
        const { workspaceName, creator, collaborators } = req.body;
        const createdWorkspace = await workspaceService.createWorkspace(workspaceName, creator, collaborators);

        res.json(createdWorkspace);
    } catch (err) {
        console.error(err);
        next(err);
    }
};


// 협업자 초대하기
exports.inviteUser = async (req,res,next) => {
    try {
        // 작업자 초대 및 필요한 작업 수행
        // ...

        // 예시: 초대 완료 메시지 반환
        res.json({ message: 'User invited successfully' });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// 속한 방의 협업자 조회
exports.getCollaborator = async (req,res,next) => {
    try {
        const userId = req.query.id;
        const roomName = req.body.roomName;

        const collaborators = await workspaceService.getCollaborators(userId, roomName);
        res.json({ collaborators });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// 작업 공간 나가기(탈퇴)
exports.leaveWorkspace = async (req,res,next) => {
    try {
        // 작업 공간 탈퇴 및 필요한 작업 수행
        const userWorkspaceId = req.query.userWorkspaceId;
        // 작업 메세지
        const msg = await workspaceService.leaveWorkspace(userWorkspaceId);

        res.json({ message: msg });
    } catch (err) {
        console.error(err);
        next(err);
    }
}