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
      mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
      mongoose.connection.once('open', () => {
        console.log('MongoDb connected successfully');
        // Start the server
        server = app.listen(TEST_PORT, () => {
          console.log(`Server started on port ${TEST_PORT}`);
          resolve();
        });
      });
    });
  }, 10000);
  

afterAll(async () => {
  // Disconnect from MongoDB
  await mongoose.connection.close();
});


  // Test for getting all published blogs
  describe('GET /api/blogs/published', () => {
    it('should return all published blogs', async () => {
      const response = await request(app).get('/api/blogs/published');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array)); 
      // Add more assertions as needed
    });
  });

    // Test for getting a published blog by ID
    describe('GET /api/blogs/published/:id', () => {
      it('should return a published blog by ID', async () => {
        const response = await request(app).get('/api/blogs/published/664023066d7a35edc752b590'); 
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
        // Add more assertions as needed
      });
    });


  
describe('POST /api/blogs/create', () => {
  beforeAll(async () => {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  

  it('should create a new blog', async () => {
    // Define a sample blog object
    const newBlog = {
      title: 'Test Blog',
      description: 'This is a test blog',
      author: 'John Doe',
      state: 'draft', // or 'published'
      read_count: 0,
      reading_time: '5 minutes',
      tags: ['test', 'sample'],
      body: 'Lorem ipsum dolor sit amet...',
    };

    // Send a POST request to create the blog
    const response = await request(app)
      .post('/api/blogs/create')
      .send(newBlog)
      .set('Accept', 'application/json');

    // Check if the response status is 201 Createdy
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.any(Array)); 

    // Check if the response body contains the created blog
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(newBlog.title);
    expect(response.body.description).toBe(newBlog.description);
    // Add more assertions as needed
  });
});

});
