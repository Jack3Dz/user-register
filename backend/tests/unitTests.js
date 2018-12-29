const test = require('tape')
const request = require('supertest')
const express = require('express')

const User = require('../models/user')
const app = require('../index')
let userId

before(done => {
    app.on('APP_STARTED', () => {
        done()
    })
})

describe('API Integration Test', function() {
    it('Runs all tests', function(done) {

        test('/api/v1/users/', assert => {
            request(app)
                .post('/api/v1/users/')
                .send(new User('test name', '27810384074'))
                .expect(200)
                .end((err, res) => {
                    if (err) return assert.fail(JSON.stringify(res))
                    assert.pass('Created a new user successfully, test passed!')
                    assert.end()
                })
        })

        test('/api/v1/users/', assert => {
            request(app)
                .get('/api/v1/users/')
                .expect(200)
                .end((err, res) => {
                    if (err) return assert.fail(JSON.stringify(res))
                    userId = res.body[0]._id
                    assert.pass('Got all users successfully, test passed!')
                    assert.end()
                })
        })

        test('/api/v1/users/:id', assert => {
            request(app)
                .get(`/api/v1/users/${userId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return assert.fail(JSON.stringify(res))
                    assert.pass('Got a specific user successfully, test passed!')
                    assert.end()
                })
        })

        test('/api/v1/users/:id', assert => {
            request(app)
                .patch(`/api/v1/users/${userId}`)
                .send(new User('test name edit', 'test cpfcnpj edit'))
                .expect(200)
                .end((err, res) => {
                    if (err) return assert.fail(JSON.stringify(res))
                    assert.pass('Edited a users successfully, test passed!')
                    assert.end()
                })
        })

        test('/api/v1/users/:id', assert => {
            request(app)
                .delete(`/api/v1/users/${userId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return assert.fail(JSON.stringify(res))
                    assert.pass('Deleted a specific user successfully, test passed!')
                    assert.end()
                    done()
                })
        })
    })
})