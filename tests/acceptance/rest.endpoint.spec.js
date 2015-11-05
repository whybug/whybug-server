var request = require('supertest-as-promised');

import {signUpUser} from '../../src/app/User/Action/SignUpUser';
import {searchSolutions} from '../../src/app/Solution/Query/SearchSolutions';
import {findSolutionsForError} from '../../src/app/Solution/Query/FindSolutionForError';

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

    it('POST /api/rest/actions', () =>
      request('localhost:8000')
        .post('/api/rest/actions')
        .set('Accept', 'application/json')
        .send(signUpUser({loginService: 'google'}))
        .expect(200, {})
    );

    it('POST /api/rest/queries', () =>
      request('localhost:8000')
        .post('/api/rest/queries')
        .set('Accept', 'application/json')
        .send(findSolutionsForError({level: 'warn'}))
        .expect(200, {})
    );

    it('GET /api/solutions', () =>
      request('localhost:8000')
        .get('/api/solutions?q=' + 'test')
        .set('Accept', 'application/json')
        .expect(200, { total: 0, solutions: [], aggregations: [] })
    );
  });

});
