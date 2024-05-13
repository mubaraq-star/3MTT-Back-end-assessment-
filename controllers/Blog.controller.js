// blogController.js

const Blog = require("../models/Blog.js");

exports.getAllPublishedBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ state: "published" });
    res.json(blogs);
    console.log(blogs);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.getPublishedBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.state !== "published") {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    next(error);
  }
};

// creating Blog posts with the defined schemas
exports.createBlog = async (req, res, next) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

// controllers/BlogController.js

exports.updateBlogState = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const newState = req.body.state;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    blog.state = newState;
    await blog.save();

    res.json(blog);
  } catch (error) {
    next(error);
  }
};

// controllers/blogController.js

exports.editBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const updatedData = req.body;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    Object.assign(blog, updatedData);
    await blog.save();

    res.json(blog);
  } catch (error) {
    next(error);
  }
};

// controllers/blogController.js

exports.deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;

    // Find the blog by ID and delete it
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    // Check if the blog exists
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getAllBlogs = async (req, res, next) => {
  try {
    const posts = await Blog.find({
      authorId: req.user,
    });
    res.status(200).json({
      status: "success",
      posts,
    });
  } catch (err) {
    throw err;
  }
};
