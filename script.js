// FOR LOCAL TESTING: Points directly to your local computer port
const BACKEND_URL = 'http://localhost:3000';

// Pull messages from backend
async function loadMessages() {
    try {
        const response = await fetch(`${BACKEND_URL}/messages`);
        const messages = await response.json();
        const chatBox = document.getElementById('chat-box');
        chatBox.innerHTML = ''; 

        messages.forEach(msg => {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'message';
            msgDiv.innerHTML = `<strong>${msg.username}:</strong> ${msg.text}`;
            chatBox.appendChild(msgDiv);
        });
    } catch (err) {
        console.error("Could not fetch messages:", err);
    }
}

// Send a new message down to the backend
async function sendMessage() {
    const usernameInput = document.getElementById('username');
    const textInput = document.getElementById('text');

    if (!textInput.value.trim()) return;

    const payload = { username: usernameInput.value, text: textInput.value };

    try {
        const response = await fetch(`${BACKEND_URL}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            textInput.value = ''; 
            loadMessages(); 
        }
    } catch (err) {
        console.error("Failed to transmit message:", err);
    }
}

// Fetch automatically every 3 seconds
setInterval(loadMessages, 3000);
loadMessages(); 
