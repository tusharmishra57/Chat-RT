import WebSocket, {WebSocketServer} from "ws";

const wss = new WebSocketServer({port: 8080});

const allSocket: WebSocket[] = [];

wss.on("connection", (socket)=>{

    allSocket.push(socket);

    socket.on("message", (e) =>{
        for(let i=0; i<allSocket.length; i++){
            const s = allSocket[i];
            s?.send(e.toString());
        }
    })
    
    
})