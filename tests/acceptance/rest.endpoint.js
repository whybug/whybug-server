var request = require('supertest');

import {signUpUser} from '../../src/app/User/Action/SignUpUser';

describe('Rest endpoint', () => {

  describe('POST /api/rest/actions', () => {
    it('takes signup action', (done) => {
      request('localhost:8000')
        .post('/api/rest/actions')
        .set('Accept', 'application/json')
        .send(signUpUser({loginService: "google"}))
        .expect(200, done);
    })
  });



  //describe('GET /api/solutions', () => {
  //  it('responds with json', (done) => {
  //    request('localhost:8000')
  //      .get('/api/solutions')
  //      .set('Accept', 'application/json')
  //      .expect('Content-Type', /json/)
  //      .expect(200, done);
  //  })
  //});
});
