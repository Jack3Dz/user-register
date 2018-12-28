const test = require('tape')
const request = require('supertest')
const express = require('express')

const User = require('../models/User')
const app = require('../index')
let userId

before(done => {
    app.on('APP_STARTED', () => {
        done()
    })
})

describe('API Integration Test', () => {
    it('Runs all tests', done => {
        test('/api/users/new', assert => {
            request(app)
                .post('/api/users/new')
                .send(new User('test name', '27810384074'))
                .expect(200)
                .end((err, res) => {
                    if (err) return assert.fail(JSON.stringify(res))
                    assert.pass('Created a new user successfully, test passed!')
                    assert.end()
                })
        })

        test('/api/users/all', assert => {
            request(app)
                .get('/api/users/all')
                .expect(200)
                .end((err, res) => {
                    if (err) return assert.fail(JSON.stringify(res))
                    documentId = res.body[0]._id
                    assert.pass('Got all users successfully, test passed!')
                    assert.end()
                })
        })

        test('/api/users/:id', assert => {
            request(app)
                .get(`/api/users/${documentId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return assert.fail(JSON.stringify(res))
                    assert.pass('Got a specific user successfully, test passed!')
                    assert.end()
                })
        })

        test('/api/users/edit/:id', assert => {
            request(app)
                .patch(`/api/users/edit/${documentId}`)
                .send(new Document('test name edit', 'test cpfcnpj edit'))
                .expect(200)
                .end((err, res) => {
                    if (err) return assert.fail(JSON.stringify(res))
                    assert.pass('Edited a users successfully, test passed!')
                    assert.end()
                })
        })

        test('/api/users/delete/:id', assert => {
            request(app)
                .delete(`/api/users/delete/${documentId}`)
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