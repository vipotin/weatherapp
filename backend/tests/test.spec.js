// Import the dependencies for testing
const chai = require('chai',);
const chaiHttp = require('chai-http',);
const app = require('../src/index',);

// Configure chai
chai.use(chaiHttp,);
chai.should();

describe('Weather', () => {
  describe('GET /', () => {
    // Test to get weather data
    it('should get weather data', (done,) => {
      chai.request(app,)
        .get('/api/weather',)
        .end((err, res,) => {
          if (err) done(err,);
          res.status.should.eql(200,);
          res.body.should.be.a('object',);
          done();
        },);
    },);
  },);
},);
