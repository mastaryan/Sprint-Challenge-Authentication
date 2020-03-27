const request = require('supertest');
const server = require('../api/server.js');

describe('auth-router', () => {
    it('should run the tests', () => {
        expect(true).toBe(true)
    });

    describe('POST /api/auth/register', () => {
        let data = {
            "id": "568", 
            "username": "harry",
            "password": "asdfasdf"
        }
        it('responds with 201 created', done => {
            request(server)
                .post('/api/auth/register')
                .send(data)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err) => {
                    err
                    ? done(err)
                    :done();
                });
        });
        it('responds with a 500 if already created', done => {
            request(server)
                .post('/api/auth/register')
                .send(data)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end((err) => {
                    err
                    ? done(err)
                    :done();
        });
    });
});
    describe('POST /api/auth/login', () => {
        let data = {
            "id": "400",
            "username": "testing-username",
            "password": "password"
        }
        let invalidData = {
            "id": "689",
            "username": "qwerty",
            "password": "asdfasdf"
        }
        it('responds with 200 OK', done => {
            request(server)
                .post('/api/auth/login')
                .send(data)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err) => {
                    err
                    ? done(err)
                    :done();
                });
        });
        it('responds with 401', done => {
            request(server)
                .post('/api/auth/login')
                .send(invalidData)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401)
                .end((err) => {
                    err
                    ? done(err)
                    :done();
                });
        });
    });
});