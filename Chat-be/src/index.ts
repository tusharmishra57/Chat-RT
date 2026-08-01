import WebSocket, {WebSocketServer} from "ws";

const wss = new WebSocketServer({port: 8080});

interface User {
    socket: WebSocket;
    roomId: string
}

let allSocket : User[] = [];

wss.on("connection", (socket) =>{
    socket.on("message", (e) =>{
        // @ts-ignore
        const parsedData = JSON.parse(e);

        if(parsedData.type == "Join"){
            allSocket.push({
                socket: socket,
                roomId: parsedData.payload.roomId
            })
        }

        if(parsedData.type == "chat"){  
            const userRoom = allSocket.find((x) => x.socket == socket)?.roomId;

            for(let i=0; i<allSocket.length; i++){
                if(allSocket[i]?.roomId == userRoom){
                    allSocket[i]?.socket.send(parsedData.payload.message);
                }
            }
        }
    })
})