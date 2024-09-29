const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const PORT = 3000;

const app = express();

// Middleware to serve static files from the root directory
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userinfo');
const db = mongoose.connection;
db.once('open', () => {
    console.log('MongoDB connected');
});

// User schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Users = mongoose.model('User', userSchema);

// Route to serve your HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'websiteindex.html'));
});

// POST route to handle sign up
app.post('/post', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new Users({ username, password });
        await user.save();
        console.log('User registered:', user);

        // Redirect to imageentry.html upon successful sign-up
        res.redirect('/imageentry.html');
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal server error');
    }
});

// POST route to handle sign in
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    
    const user = await Users.findOne({ username, password });
    
    if (user) {
        // User found, redirect to history.html
        res.redirect('/history.html');
    } else {
        // User not found, redirect back with error
        res.redirect('/?error=invalid');
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
