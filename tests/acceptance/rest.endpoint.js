var request = require('supertest-as-promised');

import {signUpUser} from '../../src/app/User/Action/SignUpUser';

describe('Rest endpoint', () => {

  describe('smoke tests', () => {

    it('GET /', () =>
      request('localhost:8000')
        .get('/')
        .set('Accept', 'text/html')
        .expect(200)
        .expect((res) => {
          res.body.should.be.string
          //res.body.should.contain('navbar-section')
        })
    );

    it('POST /api/rest/actions', () =>
      request('localhost:8000')
        .post('/api/rest/actions')
        .set('Accept', 'application/json')
        .send(signUpUser({loginService: "google"}))
        .expect(200, {})
    );
  });

});
