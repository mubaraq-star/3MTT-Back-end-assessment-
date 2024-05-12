const request = require('supertest');
const app = require('../app'); 

describe('Blog API Endpoints', () => {
  // Test for getting all published blogs
  describe('GET /api/blogs', () => {
    it('should return all published blogs', (done) => {
      chai.request(app)
        .get('/api/blogs')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          // Add more assertions as needed
          done();
        });
    });
  });

  // Test for getting a published blog by ID
  describe('GET /api/blogs/:id', () => {
    it('should return a published blog by ID', (done) => {
      const blogId = '123'; // Replace '123' with an actual blog ID
      chai.request(app)
        .get(`/api/blogs/${blogId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          // Add more assertions as needed
          done();
        });
    });
  });

  
});
