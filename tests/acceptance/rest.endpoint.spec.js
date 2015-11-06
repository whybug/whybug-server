var request = require('supertest-as-promised');

import {signUpUser} from '../../src/app/User/Action/SignUpUser';
import {searchSolutions} from '../../src/app/Solution/Query/SearchSolutions';
import {findSolutionsForError} from '../../src/app/Solution/Query/FindSolutionForError';

const errorMock = {
  "programminglanguage": "php",
  "programminglanguage_version": "5.4.24",
  "message": "Cannot access empty property",
  "code": "1",
  "level": "exception",
  "file_path": "/Volumes/com_mit/frontend/vendor/whybug-php/test.php",
  "line": 10,
  "os": "Darwin",
  "os_version": "13.3.0",
  "protocol_version": 1,
  "created_at": new Date("2014-09-20T14:54:17.792Z"),
  "client_ip": "127.0.0.1"
};

describe('Rest endpoint', () => {

  describe('smoke tests', () => {

    it('GET /', () =>
      request('localhost:8000')
        .get('/')
        .set('Accept', 'text/html')
        .expect(200)
        .expect((res) => {
          res.text.should.contain('navbar-section')
        })
    );

    it('Action endpoint', () =>
      request('localhost:8000')
        .post('/api/rest/actions')
        .set('Accept', 'application/json')
        .send(signUpUser({loginService: 'google'}))
        .expect(200, {})
    );

    it('Query endpoint', () =>
      request('localhost:8000')
        .post('/api/rest/queries')
        .set('Accept', 'application/json')
        .send(findSolutionsForError({level: 'warn'}))
        .expect(200, {})
    );

    it('Query solution', () =>
      request('localhost:8000')
        .get('/api/solutions?q=' + 'test')
        .set('Accept', 'application/json')
        .expect(200, { total: 0, solutions: [], aggregations: [] })
    );

  });

});
