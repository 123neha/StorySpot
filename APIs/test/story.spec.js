process.env.NODE_ENV = 'TEST';

const mongoose = require("mongoose");
const Story = require('../server/models/story.model');
const User = require('../server/models/user.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const should = chai.should();

chai.use(chaiHttp);
describe('Story Module', () => {
    beforeEach((done) => {
        User.deleteMany({}, (err) => {
            Story.deleteMany({}, (err) => {
                done();
            });
        });
    });

    it('it should GET all the stories', (done) => {
        chai.request(server)
            .get('/v1/api/story')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.data.should.be.a('array');
                res.body.data.length.should.be.eql(0);
                done();
            });
    });

    it('it should not POST a story without title field', (done) => {
        let story = {
            content: 'Sample story used for TDD'
        }
        chai.request(server)
            .post('/v1/api/story')
            .send(story)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('Validation errors');
                res.body['Validation errors'].should.have.property('title');
                res.body['Validation errors'].title.should.have.property('msg').eql('Invalid/Empty title');
                done();
            });
    });

    it('it should POST a story', (done) => {
        let user = new User({
            firstName: 'fname',
            lastName: 'lname',
            email: 'demoemail.com'
        });

        user.save((err, newUser) => {
            let story = {
                title: 'story1',
                content: 'Sample story used for TDD',
                createdBy: newUser._id
            }
            chai.request(server)
                .post('/v1/api/story')
                .send(story)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('message').eql('Draft saved successfully');
                    res.body.data.should.have.property('title');
                    done();
                });

        });
    });

    it('it should GET all the stories', (done) => {
        let user = new User({
            firstName: 'fname',
            lastName: 'lname',
            email: 'demoemail.com'
        });

        user.save((err, newUser) => {
            let story = new Story({
                title: 'story1',
                content: 'Sample story used for TDD',
                createdBy: newUser._id,
                status: 'published',
                createdOn: Date.now(),
                lastModifiedOn: Date.now()
            });
            story.save((err1, newStory) => {
                chai.request(server)
                    .get('/v1/api/story?pageNumber=1&status=published&sort=createdOn:desc')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.data.should.be.a('array');
                        res.body.data.length.should.be.eql(1);
                        res.body.data[0].title.should.be.eql('story1');
                        done();
                    });
            });
        });
    });

    it('it should GET all the stories in ascending order if order not provided', (done) => {
        let user = new User({
            firstName: 'fname',
            lastName: 'lname',
            email: 'demoemail.com'
        });

        user.save((err, newUser) => {
            let story = new Story({
                title: 'story1',
                content: 'Sample story used for TDD',
                createdBy: newUser._id,
                status: 'published',
                createdOn: Date.now(),
                lastModifiedOn: Date.now()
            });
            story.save((err1, newStory) => {
                chai.request(server)
                    .get('/v1/api/story?pageNumber=1&status=published&sort=createdOn')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.data.should.be.a('array');
                        res.body.data.length.should.be.eql(1);
                        res.body.data[0].title.should.be.eql('story1');
                        done();
                    });
            });
        });
    });

    it('it should GET the stories by id', (done) => {
        let user = new User({
            firstName: 'fname',
            lastName: 'lname',
            email: 'demoemail.com'
        });

        user.save((err, newUser) => {
            let story = new Story({
                title: 'story1',
                content: 'Sample story used for TDD',
                createdBy: newUser._id,
                status: 'published',
                createdOn: Date.now(),
                lastModifiedOn: Date.now()
            });
            story.save((err1, newStory) => {
                chai.request(server)
                    .get('/v1/api/story/' + newStory._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.data.should.be.a('array');
                        res.body.data.length.should.be.eql(1);
                        res.body.data[0].title.should.be.eql('story1');
                        done();
                    });
            });
        });
    });
});