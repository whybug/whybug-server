var request = require('supertest-as-promised');

describe('GET /healthcheck', () => {

    it('GET /', () =>
        request('localhost:8000')
            .get('/healthcheck')
            .set('Accept', 'text/html')
            .expect(200)
            .expect((res) => {
                res.text.should.contain('OK')
            })
    );
});
