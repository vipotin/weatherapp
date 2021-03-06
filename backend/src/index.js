// const debug = require('debug')('weathermap');
require('dotenv',).config();

const Koa = require('koa',);
const router = require('koa-router',)();
const fetch = require('node-fetch',);
const cors = require('kcors',);

const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors(),);

const fetchWeather = async () => {
  const endpoint = `${mapURI}/weather?q=${targetCity}&appid=${appId}&`;
  const response = await fetch(endpoint,);

  return response ? response.json() : {};
};

const fetchForecast = async () => {
  const endpoint = `${mapURI}/forecast?q=${targetCity}&cnt=5&appid=${appId}&`;
  const response = await fetch(endpoint,);

  return response ? response.json() : {};
};

const fetchForecastByLocation = async (lon, lat,) => {
  const endpoint = `${mapURI}/forecast?lat=${lat}&lon=${lon}&cnt=5&appid=${appId}`;
  const response = await fetch(endpoint,);

  return response ? response.json() : {};
};

// eslint-disable-next-line comma-dangle
router.get('/api/weather', async ctx => {
  const weatherData = await fetchWeather();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.weather ? weatherData.weather[0] : {};
},);

// eslint-disable-next-line comma-dangle
router.get('/api/forecast', async ctx => {
  const weatherData = await fetchForecast();
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData
    ? {
      weatherData: weatherData.list,
      city: weatherData.city.name,
    }
    : {};
},);

// eslint-disable-next-line comma-dangle
router.get('/api/forecastbylocation', async ctx => {
  if (ctx.request.query.lat && ctx.request.query.lon) {
    const { lon, lat, } = ctx.request.query;
    const weatherData = await fetchForecastByLocation(lon, lat,);
    ctx.type = 'application/json; charset=utf-8';
    ctx.body = weatherData
      ? {
        weatherData: weatherData.list,
        city: weatherData.city.name,
      }
      : {};
  }
},);

app.use(router.routes(),);
app.use(router.allowedMethods(),);

const server = app.listen(port,);

console.log(`App listening on port ${port}`,);

// Export our app for testing purposes
module.exports = server;
