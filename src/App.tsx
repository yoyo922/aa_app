import "./App.css";
import React from "react";
import axios from "axios";
import WeatherDisplay from "./WeatherComponent/WeatherDisplay";

interface myState {
  city: string;
  weatherData: any;
}

const cities = ["Ottawa", "Moscow", "Tokyo"];
//API key for openeweather API
const api_key = "ceaabd1441aec5eb12417e86fc7f7b4f";
const daysToCheck = 5;

interface latLng {
  lat: string;
  lng: string;
}

interface locations {
  Ottawa: latLng;
  Moscow: latLng;
  Tokyo: latLng;
}

const cityLocations: locations = {
  Ottawa: {
    lat: "45.4215",
    lng: "-75.6972",
  },
  Moscow: {
    lat: "55.7558",
    lng: "37.6173",
  },
  Tokyo: {
    lat: "35.6762",
    lng: "139.6503",
  },
};

class App extends React.Component<{}, myState> {
  constructor(props: any) {
    super(props);
    this.state = {
      city: "Ottawa",
      weatherData: null,
    };
  }

  componentDidMount(): void {
    const { city } = this.state;
    this.getApiData(city);
  }

  /**
   * function to call openweather API to retrieve information about a the city,
   * it will call two end-points, one for a 5 days forecast starting tomorrow,
   * and one for weather data for today, will store information in component state
   * @param city - string of the city to get weather information for
   */
  getApiData = async (city: String) => {
    let forecastRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${
        cityLocations[city as keyof locations].lat
      }&lon=${
        cityLocations[city as keyof locations].lng
      }&units=metric&appid=${api_key}`
    );

    let fiveDaysWeather = this.getFourDaysWeather(forecastRes.data.list);
    this.setState({
      weatherData: fiveDaysWeather,
    });
  };

  /**
   * Function to parse information needed from openweather API response
   * it will retrieve temperature, weather, icon and day as needed information
   * for the child component
   * @param weatherData - api response from openweather api
   * @returns - the needed information
   */
  getFourDaysWeather = (weatherData: Array<any>): Array<any> => {

    let fiveDaysWeather: any = [];
    let weatherTemp: number = 0;
    let weatherTempCount = 0;
    let weatherType: string = weatherData[0].weather[0].main;
    let weatherIcon: string = weatherData[0].weather[0].icon;
    let timeString: string = weatherData[0].dt_txt.split(" ")[1];
    let dayString: string = weatherData[0].dt_txt.split(" ")[0];
    let dayStamp: string = weatherData[0].dt;

    weatherData.forEach((element, index) => {

      if (
        dayString !== element.dt_txt.split(" ")[0] &&
        fiveDaysWeather.length < daysToCheck
      ) {
        
        fiveDaysWeather.push({
          day: dayStamp,
          temp: Math.round(weatherTemp / weatherTempCount),
          weather: weatherType,
          icon: weatherIcon,
        });

        weatherType = "";
        weatherIcon = "";
        weatherTemp = 0;
        weatherTempCount = 0;
      }
      // check for edge case where last element of array is a new day
      if (
        index === weatherData.length - 1 &&
        fiveDaysWeather.length < daysToCheck &&
        element.dt_txt.split(" ")[0] !== dayString
      ) {
        fiveDaysWeather.push({
          day: element.dt,
          temp: Math.round(element.main.temp),
          weather: element.weather[0].main,
          icon: element.weather[0].icon,
        });
      }

      dayString = element.dt_txt.split(" ")[0];
      timeString = element.dt_txt.split(" ")[1];
      dayStamp = element.dt;

      if (timeString === "12:00:00") {
        weatherType = element.weather[0].main;
        weatherIcon = element.weather[0].icon;
      }

      weatherTemp = weatherTemp + element.main.temp;
      weatherTempCount = weatherTempCount + 1;
    });
    return fiveDaysWeather;
  };

  /**
   * call back to handle onclick event to select cities
   * will set component to be the user selected city
   * @param e - button click event
   */
  setCity = (e: any) => {
    this.setState(
      {
        city: e.target.name,
      },
      () => {
        this.getApiData(this.state.city);
      }
    );
  };

  render() {
    const { city, weatherData } = this.state;

    return (
      <div className="App">
        <div className="city-header">
          {cities.map((currentCity) => (
            <button
              key={currentCity}
              className={city === currentCity ? "selected" : ""}
              name={currentCity}
              onClick={this.setCity}
            >
              {currentCity}
            </button>
          ))}
        </div>
        <WeatherDisplay
          city={city}
          fourDaysData={weatherData}
        ></WeatherDisplay>
      </div>
    );
  }
}

export default App;
