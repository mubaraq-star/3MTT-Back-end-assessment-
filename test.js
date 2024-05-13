const request = require('supertest');
const mongoose = require('mongoose');

const app = require('./app'); // Assuming your Express app is exported from 'app.js'

const TEST_PORT = 3001; // Choose a different port for testing

describe('Blog API Endpoints', () => {
  let server;

  // Before running the tests, start the server
  beforeAll(async () => {
    await new Promise((resolve) => {
      // Connect to MongoDB
      mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      mongoose.connection.once('open', () => {
        console.log('MongoDb connected successfully');
        resolve();
      });
    });
  });
  
  afterAll(async () => {
    // Disconnect from MongoDB
    await mongoose.connection.close();
  });
  // Test for getting all published blogs
  describe('GET /api/blogs/published', () => {
    it('should return all published blogs', async () => {
      const response = await request(app).get('/api/blogs/published');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array)); // Assuming the response body is an array
      // Add more assertions as needed
    });
  });

  // Add more test cases for other endpoints


  // Test for getting a published blog by ID
  describe('GET /api/blogs/:id', () => {
    it('should return a published blog by ID', async () => {
      const blogId = '123'; // Replace '123' with an actual blog ID
      const response = await request(app).get(`/api/blogs/${blogId}`);
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object');
      // Add more assertions as needed
    });
  });

  // Add more test cases for other endpoints as needed

});