import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getForecastFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/forecast`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getForecastByLocationFromApi = async (lat, lon) => {
  try {
    const response = await fetch(`${baseURL}/forecastbylocation?lat=${lon}&lon=${lat}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getWeatherIcons = async (data) => {
  const list = [];
  data.weatherData.forEach((item) => {
    const icon = item.weather[0].icon.slice(0, -1);
    const time = `${new Date(item.dt_txt).getHours()}.00`;
    const id = item.dt;
    list.push({ icon, time, id });
  });
  return list;
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icons: [],
      city: '',
    };
  }

  async componentDidMount() {
    /* global navigator */
    // Get forecast based on geolocation or in default location if geolocation is blocked
    if (navigator.geolocation) {
      this.getForecastByLocation();
    } else {
      this.getDefaultForecast();
    }
  }

  async getForecastByLocation() {
    // Get forecast by geolocation
    const success = async (pos) => {
      if (pos.coords) {
        const { latitude, longitude } = pos.coords;
        const forecast = await getForecastByLocationFromApi(latitude, longitude);
        this.setState(
          {
            error: '',
            icons: await getWeatherIcons(forecast),
            city: forecast.city,
          },
        );
      }
    };

    // Get default location
    const error = async () => {
      this.setState({ error: 'Unable to fetch location' });
      this.getDefaultForecast();
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }

  async getDefaultForecast() {
    const [weather, forecast] = await Promise.all([getWeatherFromApi(), getForecastFromApi()]);
    if (weather && forecast.weatherData) {
      this.setState(
        {
          error: '',
          icons: await getWeatherIcons(forecast),
          city: forecast.city,
        },
      );
    } else {
      this.setState({ error: 'Unable to fetch forecast' });
    }
  }

  render() {
    const {
      icons, error, city,
    } = this.state;

    return (
      <div className="container">
        {city ? <h2>{`Weather in ${city}`}</h2> : <h2>Loading</h2>}
        <div className="weather-list">
          {icons && icons.map((item) => (
            <div className="icon" key={item.id}>
              <img src={`/img/${item.icon}.svg`} alt="weather-icon" />
              <p className={`${item.id}time`}>{item.time}</p>
            </div>
          ))}
        </div>
        {error !== '' ? undefined : <p key={error}>{error}</p>}
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app'),
);

export default Weather;
