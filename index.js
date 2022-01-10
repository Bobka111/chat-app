// create express server
const server = require("express")();
// import server from http
const { createServer } = require("http");
// import server from socket.io
const { Server } = require("socket.io");

// create http server
const httpServer = createServer(server);
// create socket server using http server
const socketServer = new Server(httpServer);
 
// server ui using express static
server.use(require("express").static("./ui"));

let messages = [];
const colors = [ "#FF7A7A", "#7AE6FF", "#7AFF93", "#FFF67A", "#FF7ADE", "#5054F3" ];

socketServer.on("connection", socket => {
    let color = colors[Math.floor(Math.random() * colors.length)];
    if(color == null) color = colors[0];
    socketServer.emit("chat message", messages);
    socket.on("chat message", ([name, message]) => {
        messages.push({ user: name, color: color, message: message, admin: false });
        socketServer.emit("chat message", messages);
    });
    console.log("user has connected")
});

require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
}).on("line", message => {
    if(message == "/clear") {
        messages = [];
    } else {
        messages.push({ user: "admin", color: "red", message: message, admin: true });
    }
    socketServer.emit("chat message", messages);
});

const port = 20502;
httpServer.listen(port);
console.log("Ready")
console.log(`Server now online on http://localhost:${port}/`)