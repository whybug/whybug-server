var request = require('supertest-as-promised');

describe('Security headers', () => {

    it('GET /', () =>
        request('localhost:8000')
            .get('/')
            .set('Accept', 'text/html')
            .expect(200)
            .expect((res) => {
                res.headers.should.contain({
                    'x-content-type-options': 'nosniff',
                    'x-frame-options': 'SAMEORIGIN',
                    'x-download-options': 'noopen',
                    'x-xss-protection': '1; mode=block'
                })
            })
    );
});
