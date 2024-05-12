const express = require('express');
const CONFIG = require('./config/config');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const blogRoutes = require('./routes/blog.routes');
const ConnectionToDb = require('./db/mongodb')
const logger = require("./logging/logger")


// connection to database
ConnectionToDb()

const app = express();


// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()); 


// Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
const { Logger } = require('winston');

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Blog API');
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  });


// Connect to Server
app.listen(CONFIG.PORT, ()=>{
    console.log(`server started on http://localhost:${CONFIG.PORT}`);
})