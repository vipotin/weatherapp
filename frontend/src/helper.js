const baseURL = process.env.ENDPOINT;

// Get current weather in default location
export const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    // console.error(error);
  }

  return {};
};

// Get weather forecast in default location
export const getForecastFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/forecast`);
    return response.json();
  } catch (error) {
    // console.error(error);
  }

  return {};
};

// Get weather forecast in user location
export const getForecastByLocationFromApi = async (lat, lon) => {
  try {
    const response = await fetch(`${baseURL}/forecastbylocation?lat=${lon}&lon=${lat}`);
    return response.json();
  } catch (error) {
    // console.error(error);
  }

  return {};
};

// Get weather information for rendering
export const getWeatherInfo = async (data) => {
  const list = [];
  data.weatherData.forEach((item) => {
    const icon = item.weather[0].icon.slice(0, -1);
    const time = `${new Date(item.dt_txt).getHours()}.00`;
    const id = item.dt;
    list.push({ icon, time, id });
  });
  return list;
};
