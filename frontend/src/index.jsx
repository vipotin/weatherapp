import React from 'react';
import ReactDOM from 'react-dom';
import { getForecastFromApi, getForecastByLocationFromApi, getWeatherInfo } from './helper';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icons: [],
      city: '',
      loading: true,
    };
  }

  async componentDidMount() {
    /* global navigator */
    // Get forecast based on geolocation or default location if geolocation is blocked
    if (navigator.geolocation) {
      this.getForecastByLocation();
    } else {
      this.getDefaultForecast();
    }
  }

  async getDefaultForecast() {
    const forecast = await getForecastFromApi();
    if (forecast.weatherData) {
      this.setState(
        {
          error: '',
          icons: await getWeatherInfo(forecast),
          city: forecast.city,
          loading: false,
        },
      );
    } else {
      this.setState({ error: 'Unable to fetch forecast' });
    }
  }

  async getForecastByLocation() {
    // Get forecast in geolocation
    const success = async (pos) => {
      if (pos.coords) {
        const { latitude, longitude } = pos.coords;
        const forecast = await getForecastByLocationFromApi(latitude, longitude);
        this.setState(
          {
            error: '',
            icons: await getWeatherInfo(forecast),
            city: forecast.city,
            loading: false,
          },
        );
      }
    };

    // Get forecast in default location
    const error = async () => {
      this.getDefaultForecast();
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }

  render() {
    const {
      icons, error, city, loading,
    } = this.state;

    return (
      <div className="container">
        {loading ? <h2>Loading</h2> : <h2>{`Weather in ${city}`}</h2>}
        <div className="weather-list">
          {icons && icons.map((item) => (
            <div className="weather" key={item.id}>
              <img src={`/img/${item.icon}.svg`} alt="weather-icon" />
              <p>{item.time}</p>
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
