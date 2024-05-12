const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
  state: { type: String, enum: ["draft", "published"], default: "draft" }, // Indicates if the blog is in draft or published state
  read_count: { type: Number, default: 0 }, // Number of times the blog has been read
  reading_time: { type: String }, // Estimated reading time of the blog
  tags: [{ type: String }], // Tags associated with the blog
  body: { type: String, required: true }, // Body/content of the blog
  timestamp: { type: Date, default: Date.now }, // Timestamp of when the blog was created/updated
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
