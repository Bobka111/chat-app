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

const messages = [];
const colors = [ "#FF7A7A", "#7AE6FF", "#7AFF93", "#FFF67A", "#FF7ADE", "#5054F3" ];

socketServer.on("connection", socket => {
    let color = colors[Math.floor(Math.random() * colors.length)];
    if(color == null) color = colors[0];
    socketServer.emit("chat message", messages);
    socket.on("chat message", ([name, message]) => {
        messages.push({ user: name, color: color, message: message });
        socketServer.emit("chat message", messages);
    });
    console.log("user has connected")
});

const port = Number(process.env.PORT) || 6969;
httpServer.listen(port);
console.log(`Server now online on http://localhost:${port}/`)