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

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icons: [],
      city: '',
    };
  }

  async componentDidMount() {
    // const weather = await getWeatherFromApi();
    // const forecast = await getForecastFromApi();
    // let forecastData = [];
    // forecast.forEach((item) => {
    //   const weatherIcon = item.weather[0].icon.slice(0, -1);
    //   console.log(weatherIcon);
    //   const time = item.dt_txt;
    //   const id = item.dt;
    //   forecastData.push({ icon: weatherIcon, time, id });
    // });
    // console.log(forecastData);
    // // this.setState({ icon: forecast.weather.icon.slice(0, -1) });
    // this.setState({ icons: forecastData });
    this.getForecast();
  }

  async getForecast() {
    const [weather, forecast] = await Promise.all([getWeatherFromApi(), getForecastFromApi()]);
    if (weather && forecast.weatherData) {
      const list = [];
      forecast.weatherData.forEach((item) => {
        const icon = item.weather[0].icon.slice(0, -1);
        const time = `${new Date(item.dt_txt).getHours()}.00`;
        const id = item.dt;
        list.push({ icon, time, id });
      });
      this.setState(
        {
          error: '',
          icons: list,
          city: forecast.city,
        },
      );
    } else {
      this.setState({ error: 'Unbable to fetch weather' });
    }
  }

  render() {
    const {
      icons, error, city,
    } = this.state;
    console.log(icons, city);

    return (
      <div className="container">
        <h2>{`Weather in ${city}`}</h2>
        {error !== '' ? undefined : <p key={error}>{error}</p>}
        <div className="weather-list">
          {icons.map((item) => (
            <div className="icon" key={item.id}>
              <img src={`/img/${item.icon}.svg`} alt="weather-icon" />
              <p className={`${item.id}time`}>{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app'),
);

export default Weather;
