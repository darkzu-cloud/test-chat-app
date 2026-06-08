const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Temporary in-memory array to store messages
let messages = [
    { username: "System", text: "Welcome to the test chat room!" }
];

// FIXED: Allows both local 'file:///' testing and live GitHub Pages sites
app.use(cors({
    origin: '*' 
}));

app.use(express.json());

// Fallback root route so you don't get "Cannot GET /"
app.get('/', (req, res) => {
    res.send('Backend chat server is online and working perfectly!');
});

// Endpoint to fetch all messages
app.get('/messages', (req, res) => {
    res.json(messages);
});

// Endpoint to post a new message
app.post('/messages', (req, res) => {
    const { username, text } = req.body;
    
    if (!username || !text) {
        return res.status(400).json({ error: "Username and text are required." });
    }

    const newMessage = { username, text, timestamp: new Date() };
    messages.push(newMessage);
    res.status(201).json(newMessage);
});

app.listen(PORT, () => {
    console.log(`Backend chat server running locally on http://localhost:${PORT}`);
});
