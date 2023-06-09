const express = require('express');
const workspaceController = require("../controller/workspace_controller");
const router = express.Router();

// 모든 작업 가져오기 http://localhost:3000/workspace/my-work?id=1
router.route('/my-work').get((req, res, next) => workspaceController.getWorkspaces(req, res, next));

// 작업 공간 열기 http://localhost:8080/workspace/open-work?id=1&roomId=3
router.route('/open-work').get((req, res, next) => workspaceController.openWorkspace(req, res, next));

// 작업 생성하기 http://localhost:3000/workspace/create-work
router.route('/create-work').post((req, res, next) => workspaceController.createWorkspace(req, res, next));

// 작업자 초대하기
router.route('/create-work/invite').post((req, res, next) => workspaceController.inviteUser(req, res, next));

// 협업자 정보 가져오기 http://localhost:3000/workspace/collaborator-info?id=kys1
router.route('/collaborator-info').get((req, res, next) => workspaceController.getCollaborator(req, res, next));

// 작업 나가기 (작업 공간 탈퇴)
router.route('/leave').post((req, res, next) => workspaceController.leaveWorkspace(req, res, next));

module.exports = router;