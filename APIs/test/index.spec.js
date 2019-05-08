const server = require('../server/server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);

describe('StorySpot APIs', () => {
    it('should be up and running', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.message.should.equal('Welcome to Story Spot APIs');
                done();
            });
    });
    it('should be up and running with full path', (done) => {
        chai.request(server)
            .get('/v1/api')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.have.property('text');
                res.text.should.equal('Welcome to Story Spot APIs');
                done();
            });
    });
});
