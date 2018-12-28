const express = require('express')

const User = require('../models/User')
const router = express.Router()

router.get('/users/all', (req, res, next) => {
    req.app.locals.db.collection('users').find({}).toArray((err, result) => {
        if (err) {
            res.status(400).send({
                'error': err
            })
        }
        if (result === undefined || result.length === 0) {
            res.status(400).send({
                'error': 'No users in database'
            })
        } else {
            res.status(200).send(result)
        }
    })
})

router.get('/users/:id', (req, res, next) => {
    req.app.locals.db.collection('users').findOne({
        '_id': req.params.id
    }, (err, result) => {
        if (err) {
            res.status(400).send({
                'error': err
            })
        }
        if (result === undefined) {
            res.status(400).send({
                'error': 'No user matching that id was found'
            })
        } else {
            res.status(200).send(result)
        }
    })
})

router.post('/users/new', (req, res, next) => {
    const newUser = new User(req.body.title, req.body.username, req.body.body)
    req.app.locals.db.collection('users').insertOne({
        newUser
    }, (err, result) => {
        if (err) {
            res.status(400).send({
                'error': err
            })
        }
        res.status(200).send(result)
    })
})

router.delete('/users/delete/:id', (req, res, next) => {
    req.app.locals.db.collection('users').deleteOne({
        '_id': req.params.id
    }, (err, result) => {
        if (err) {
            res.status(400).send({
                'error': err
            })
        }
        res.status(200).send(result)
    })
})

router.patch('/users/edit/:id', (req, res, next) => {
    req.app.locals.db.collection('users').updateOne({
        '_id': req.params.id
    }, {
        $set: {
            title: req.body.title,
            username: req.body.username,
            body: req.body.body
        }
    }, (err, result) => {
        if (err) {
            res.status(400).send({
                'error': err
            })
        }
        res.status(200).send(result)
    })
})

module.exports = router