const express = require('express');
const mongoose = require('mongoose');
const api = require('./routes/api')
const path = require('path')

require('dotenv').config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;

// support parsing of application/json type post data
app.use(express.json());

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${DB_USER}@${DB_NAME}.40jaoww.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Check MongoDB connection
db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', () => console.log('Connected to MongoDB'));


// api routes
app.use('/v1', api);

// for serving rest of static files
app.use(express.static(path.join(__dirname,  '..', '..', 'cbse-ui', 'dist')));

// Define a route for serving client 
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'cbse-ui', 'dist', 'index.html'));
});




// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
