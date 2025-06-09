
let chats = {};
let currentChat = null;

function newChat() {
    const name = prompt("Имя чата:");
    if (name && !chats[name]) {
        chats[name] = [];
        currentChat = name;
        renderChatList();
        renderChat();
    }
}

function renderChatList() {
    const list = document.getElementById("chatList");
    list.innerHTML = "";
    for (let key in chats) {
        const btn = document.createElement("button");
        btn.innerText = key;
        btn.onclick = () => {
            currentChat = key;
            renderChat();
        };
        list.appendChild(btn);
    }
}

function renderChat() {
    const log = document.getElementById("chatLog");
    log.innerHTML = "";
    if (chats[currentChat]) {
        chats[currentChat].forEach(msg => {
            const p = document.createElement("p");
            p.textContent = msg;
            log.appendChild(p);
        });
    }
}

function sendMessage() {
    const input = document.getElementById("userInput");
    const msg = input.value.trim();
    if (msg && currentChat) {
        chats[currentChat].push("🧠: " + msg);
        input.value = "";
        renderChat();
        speak(msg);
    }
}

function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(u);
}
