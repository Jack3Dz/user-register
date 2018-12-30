let mongoose = require("mongoose");
let User = require('../models/userModel');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('API tests', () => {
    beforeEach((done) => {
        User.deleteOne({}, (err) => {
            done();
        });
    });
    describe('/GET user', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get('/api/v1/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Users retrieved successfully');
                    done();
                });
        });
    });
    describe('/POST user', () => {
        it('it should POST a user ', (done) => {
            let user = {
                name: "Dummyname",
                cpfcnpj: "80220128073"
            }
            chai.request(server)
                .post('/api/v1/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('New user created!');
                    res.body.data.should.have.property('name');
                    res.body.data.should.have.property('cpfcnpj');
                    done();
                });
        });
        it('it should not POST a user', (done) => {
            let user = {
                name: "Jefferson Bruchado",
                cpfcnpj: "70131172000"
            }
            chai.request(server)
                .post('/api/v1/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    describe('/GET/:id user', () => {
        it('it should GET a user by the given id', (done) => {
            let user = new User({
                name: "Foobar",
                cpfcnpj: "64562650028"
            });
            user.save((err, user) => {
                chai.request(server)
                    .get('/api/v1/users/' + user.id)
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.data.should.have.property('name');
                        res.body.data.should.have.property('cpfcnpj');
                        res.body.data.should.have.property('_id').eql(user.id);
                        done();
                    });
            });

        });
    });
    describe('/PUT/:id users', () => {
        it('it should UPDATE a user given the id', (done) => {
            let user = new User({
                name: "Foobarr",
                cpfcnpj: "13467309038"
            });
            let userEdited = new User({
                name: "Foobaredited",
                cpfcnpj: "89847716005"
            });
            user.save((err, user) => {
                chai.request(server)
                    .put('/api/v1/users/' + user.id)
                    .send(userEdited)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message').eql('User Info updated');
                        res.body.data.should.have.property('name').eql('Foobaredited');
                        res.body.data.should.have.property('cpfcnpj').eql('89847716005');
                        done();
                    });
            });
        });
    });
    describe('/DELETE/:id user', () => {
        it('it should DELETE a user given the id', (done) => {
            let user = new User({
                name: "Dummyname",
                cpfcnpj: "42643960000110"
            })
            user.save((err, user) => {
                chai.request(server)
                    .delete('/api/v1/users/' + user.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('User deleted');
                        done();
                    });
            });
        });
    });
});