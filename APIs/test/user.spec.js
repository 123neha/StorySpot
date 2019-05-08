const mongoose = require("mongoose");
const User = require('../server/models/user.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const should = chai.should();

chai.use(chaiHttp);
describe('User Module', () => {
    beforeEach((done) => {
        User.deleteMany({}, (err) => {
            done();
        });
    });

    it('it should not POST a user without email field', (done) => {
        let user = {
            firstName: 'fname',
            lastName: 'lname'
        }
        chai.request(server)
            .post('/v1/api/user')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('Validation errors');
                res.body['Validation errors'].should.have.property('email');
                res.body['Validation errors'].email.should.have.property('msg').eql('Invalid/Empty email');
                done();
            });
    });

    it('it should POST a user', (done) => {
        let user = {
            firstName: 'fname',
            lastName: 'lname',
            email: 'demoemail.com'
        }

        chai.request(server)
            .post('/v1/api/user')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('message').eql('User is registered successfully');
                res.body.data.should.have.property('email');
                done();
            });
    });

    it('it should not POST a user with duplicate email', (done) => {
        let user = new User({
            firstName: 'fname',
            lastName: 'lname',
            email: 'demoemail.com'
        });

        user.save((err, newUser) => {
            chai.request(server)
                .post('/v1/api/user')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('message').eql('An user with this email already exists, Please try another email');
                    done();
                });
        });
    });

    it('it should not login a user if it does not exists', (done) => {
        let user = new User({
            firstName: 'fname',
            lastName: 'lname',
            email: 'demoemail.com',
            password: 'password'
        });

        user.save((err, newuser) => {

            newuser.email = 'email@changed.com';

            chai.request(server)
                .post('/v1/api/login')
                .send(newuser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('message').eql('No such user exists in system');
                    done();
                });

        });
    });

    it('it should not login a user if password is incorrect', (done) => {
        let user = new User({
            firstName: 'fname',
            lastName: 'lname',
            email: 'demoemail.com',
            password: 'password'
        });

        user.save((err, newUser) => {

            newUser.password = 'changed';

            chai.request(server)
                .post('/v1/api/login')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('message').eql('Incorrect password! Please try again with valid password.');
                    done();
                });

        });
    });

    it('it should login a user', (done) => {
        let user = new User({
            firstName: 'fname',
            lastName: 'lname',
            email: 'demoemail.com',
            password: 'password'
        });

        user.save((err, newUser) => {
            newUser.password = 'password'
            chai.request(server)
                .post('/v1/api/login')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('message').eql('User logged in successfully');
                    res.body.data.should.have.property('email');
                    done();
                });

        });
    });
});