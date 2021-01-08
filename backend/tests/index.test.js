// Import the dependencies for testing
const chai = require('chai',);
const chaiHttp = require('chai-http',);
const app = require('../src/index',);

// Configure chai
chai.use(chaiHttp,);
chai.should();

const forecastCnt = 5;

describe('Weather app', () => {
  describe('GET /', () => {
    it('should get weather data on /weather GET', (done,) => {
      chai.request(app,)
        .get('/api/weather',)
        .end((err, res,) => {
          if (err) done(err,);
          res.status.should.eql(200,);
          res.body.should.be.an('object',);
          res.body.should.have.property('id',);
          res.body.should.have.property('icon',);
          done();
        },);
    },);

    it('should get a list of weather data and the location city on /forecast GET', (done,) => {
      chai.request(app,)
        .get('/api/forecast',)
        .end((err, res,) => {
          if (err) done(err,);
          res.status.should.eql(200,);
          res.body.should.be.an('object',);

          res.body.should.have.property('weatherData',);
          res.body.weatherData.should.be.an('array',);
          res.body.weatherData.should.have.length(forecastCnt,);
          res.body.weatherData[0].should.be.an('object',);
          res.body.weatherData[0].should.have.property('dt',);
          res.body.weatherData[0].should.have.property('weather',);
          res.body.weatherData[0].should.have.property('dt_txt',);

          res.body.should.have.property('city',);
          res.body.city.should.be.a('string',);
          done();
        },);
    },);

    it('should get a list of weather data and the location city on /forecastbylocation GET', (done,) => {
      const lat = 24.9355;
      const lon = 60.1695;

      chai.request(app,)
        .get(`/api/forecastbylocation?lat=${lon}&lon=${lat}`,)
        .end((err, res,) => {
          if (err) done(err,);
          res.status.should.eql(200,);
          res.body.should.be.an('object',);

          res.body.should.have.property('weatherData',);
          res.body.weatherData.should.be.an('array',);
          res.body.weatherData.should.have.length(forecastCnt,);
          res.body.weatherData[0].should.be.an('object',);
          res.body.weatherData[0].should.have.property('dt',);
          res.body.weatherData[0].should.have.property('weather',);
          res.body.weatherData[0].should.have.property('dt_txt',);

          res.body.should.have.property('city',);
          res.body.city.should.be.a('string',);
          res.body.city.should.eql('Helsinki',);
          done();
        },);
    },);
  },);
},);
