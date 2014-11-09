var request = require('supertest');

require('../../src/app.js');

describe('Solution endpoints', () => {

  describe('GET /api/solutions', () => {
    it('responds with json', (done) => {
      request('localhost:8000')
        .get('/api/solutions')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    })
  });
});
