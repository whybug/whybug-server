var request = require('supertest-as-promised');

import {signUpUser} from '../../src/app/User/Action/SignUpUser';
import {searchSolutions} from '../../src/app/Solution/Query/SearchSolutions';
import {findSolutionsForError} from '../../src/app/Solution/Query/FindSolutionForError';
import {recordError} from '../../src/app/Error/Action/RecordError';

const errorMock = {
    "programminglanguage": "php",
    "programminglanguage_version": "5.4.24",
    "message": "Cannot access empty property",
    "code": "1",
    "level": "warning",
    "file_path": "/Volumes/com_mit/frontend/vendor/whybug-php/test.php",
    "line": 10,
    "os": "Darwin",
    "os_version": "13.3.0",
    "protocol_version": 1,
    "created_at": new Date("2014-09-20T14:54:17.792Z"),
    "client_ip": "127.0.0.1",
    "solution_uuid": "1eb138f8-850e-4555-970b-93470604de87",
    "api_key": '1eb138f8-850e-4555-970b-93470604de87',
    "checksum": '12345'
};

describe('REST smoketest', () => {

    it('GET /', () =>
        request('localhost:8000')
            .get('/')
            .set('Accept', 'text/html')
            .expect(200)
            .expect((res) => {
                res.text.should.contain('navbar-section')
            })
    );

    it('GET /non-existing', () =>
        request('localhost:8000')
            .get('/non-existing')
            .set('Accept', 'text/html')
            .expect(404)
    );

    describe('action endpoint', () => {
        it('signup user', () =>
            request('localhost:8000')
                .post('/api/rest/actions')
                .set('Accept', 'application/json')
                .send(signUpUser({loginService: 'google'}))
                .expect(200, {})
        );

        it('record error', () =>
            request('localhost:8000')
                .post('/api/rest/actions')
                .set('Accept', 'application/json')
                .send(recordError(errorMock))
                .expect(200)
        );
    });

    describe('query endpoint', () => {
        it('find solutions', () =>
            request('localhost:8000')
                .post('/api/rest/queries')
                .set('Accept', 'application/json')
                .send(findSolutionsForError({level: 'warn'}))
                .expect(200, {})
        );

        it('query solution', () =>
            request('localhost:8000')
                .get('/api/solutions?q=' + 'test')
                .set('Accept', 'application/json')
                .expect(200, {total: 0, solutions: [], aggregations: []})
        );
    });
});
