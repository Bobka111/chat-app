const name = localStorage.getItem("name");
const socket = io();
const sendMessage = message => socket.emit("chat message", [name, message]);
const updateUI = (messages) => {
    let html = ""; 
    messages.forEach(message => {
        html += `<p><span style="color:${message.color}">${message.user}:<span> <span style="color: white;">${message.message}</span></p>`;
    });
    document.getElementById("chat").innerHTML = html;
}
const sendValidatedMessage = message => {
    if(message.length > 0 && message.length <= 150) {
        if(!new RegExp("/[a-zA-Z0-9]/g").test(message)) {
            sendMessage(message);
        } else alert("Message not allowed! Allowed characters for a message are a-z, A-Z, 0-9");
    } else alert("Message not allowed! Message must be between 1 and 10 characters!");
    document.getElementById("message").value = "";
}
socket.on("chat message", messages => updateUI(messages));