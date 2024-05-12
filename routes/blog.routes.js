const express = require('express');
const router = express.Router();

const blogController = require('../controllers/Blog.controller');

// Get all published blogs
router.get('/published', blogController.getAllPublishedBlogs);

// Get a published blog by ID
router.get('/published/:id', blogController.getPublishedBlogById);

// Create a new blog (requires authentication)
router.post('/create', blogController.createBlog);

router.put('/:id/update-state', blogController.updateBlogState);


router.put('/:id/edit', blogController.editBlog);


router.delete('/:id/delete', blogController.deleteBlog);

router.get('/AllBlog', blogController.getAllBlogs);

module.exports = router;