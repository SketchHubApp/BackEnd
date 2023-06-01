const express = require('express');
const loader = require('./loader/loader');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 방 정보를 저장할 객체
const rooms = new Map();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

async function startServer() {
    await loader(app);

    wss.on('connection', (ws, req) => {
        console.log('새로운 클라이언트가 연결되었습니다.');

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(`Client connected from ${ip}`);

        ws.on('message', (message) => {
            const data = JSON.parse(message);
            const { x, y, user_name: userName, room_id: roomId } = data;
            if (typeof x !== 'undefined' && typeof y !== 'undefined') {
                console.log(`${userName} - x: ${x}, y: ${y}`);
                if (!rooms.has(roomId)) {
                    // 새로운 방 생성
                    rooms.set(roomId, new Set());
                }

                const roomClients = rooms.get(roomId);
                roomClients.add(ws);

                // 방 안의 모든 클라이언트에게 스케치 브로드캐스트
                roomClients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(message);
                    }
                });
            } else {
                console.log(`${userName} 접속`);
            }
        });
        ws.on('close', () => {
            console.log('클라이언트가 연결을 해제했습니다.');

            // 클라이언트가 속한 방에서 제거
            rooms.forEach((clients, roomId) => {
                if (clients.has(ws)) {
                    clients.delete(ws);
                    // 방이 비어있으면 제거
                    if (clients.size === 0) {
                        rooms.delete(roomId);
                    }
                }
            });
        });
    });

    server.listen(app.get('port'), () => {
        console.log(`${app.get('port')} port waiting...`);
    });
}

startServer();
