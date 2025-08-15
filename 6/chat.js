// const messages = [];

// const aInput = document.getElementById("a-input");
// const aChat = document.getElementById("a-chat");

// function sendMessage(side) {
//     let body = "";

//     switch (side) {
//         case "a": {
//             body = aInput.value;
//             break;
//         }
//         case "b": {
//             body = bInput.value;
//             break;
//         }
//     }
//     if (body == "") {
//         return;
//     }

//     const message = {
//         side,
//         body,
//         timestamp: Date.now(),
//     };

//     messages.push(message);
//     render();
// }
// function render() {
//     aChat.innerHTML = "";
//     bChat.innerHTML = "";

//     for (const message of messages) {
//         const senderMessageElement = document.createElement("div");
//         senderMessageElement.className = "message sender-msg";
//         senderMessageElement.innerHTML = message.body;

//         const receiverMessageElement = document.createElement("div");
//         receiverMessageElement.className = "message receiver-msg";
//         receiverMessageElement.innerHTML = message.body;

//         switch (message.side) {
//             case "a": {
//                 aChat.appendChild(senderMessageElement);
//                 bChat.appendChild(receiverMessageElement);

//                 break;
//             }
//             case "b": {
//                 bChat.appendChild(senderMessageElement);
//                 aChat.appendChild(receiverMessageElement);

//                 break;
//             }
//         }
//     }
// }
// Window.sendMessage = sendMessage;


const messages = [];

const chatInput = document.getElementById("chat-input");
const chatBox = document.getElementById("chat-box");

function sendMessage() {
    const body = chatInput.value.trim();
    if (body === "") return;

    const message = {
        body,
        timestamp: Date.now()
    };

    messages.push(message);
    render();
    chatInput.value = "";
}

function render() {
    chatBox.innerHTML = "";

    for (const message of messages) {
        const messageElement = document.createElement("div");
        messageElement.className = "message sender-msg";
        messageElement.innerHTML = message.body;
        chatBox.appendChild(messageElement);
    }
}

window.sendMessage = sendMessage;
