var request = require('supertest-as-promised');

import {signUpUser} from '../../src/app/User/Action/SignUpUser';

describe('Rest endpoint', () => {

  describe('startpage', () => {
    it('smoke test', () =>
      request('localhost:8000')
        .get('/')
        .set('Accept', 'text/html')
        .expect(200)
        .expect((res) => {
          res.body.should.be.string
          //res.body.should.contain('navbar-section')
        })
    )
  });

  describe('POST /api/rest/actions', () => {
    it('takes signup action', () =>
      request('localhost:8000')
        .post('/api/rest/actions')
        .set('Accept', 'application/json')
        .send(signUpUser({loginService: "google"}))
        .expect(200, {})
    )
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
