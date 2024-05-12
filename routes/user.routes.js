// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
// const authenticateUser = require('../middleware/authenticateUser');

// Sign up route
router.post('/signup', userController.signUp);

// Sign in route
router.post('/signin', userController.signIn);

// Get user profile route (requires authentication)
router.get('/profile', userController.getUserProfile);

module.exports = router;