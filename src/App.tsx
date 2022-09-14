import "./App.css";
import React from "react";
import axios from "axios";
import WeatherDisplay from "./WeatherComponent/WeatherDisplay";

interface myState {
  city: string;
  weatherData: any;
}

const cities = ["Ottawa", "Moscow", "Tokyo"];
const api_key = "ceaabd1441aec5eb12417e86fc7f7b4f";
const forecastDayInterval = 8;

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

  getApiData = (city: String) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${
          cityLocations[city as keyof locations].lat
        }&lon=${
          cityLocations[city as keyof locations].lng
        }&units=metric&appid=${api_key}`
      )
      .then((res) => {
        let fiveDaysWeather = this.getFiveDaysWeather(res.data.list);
        this.setState({
          weatherData: fiveDaysWeather,
        });
      });
  };

  getFiveDaysWeather = (weatherData: Array<any>): Array<any> => {
    let fiveDaysWeather: any = [];
    for (let i = 0; i < weatherData.length; i = i + forecastDayInterval) {
      fiveDaysWeather.push(weatherData[i]);
    }
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
        console.log("city", this.state.city);
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
              {city}
            </button>
          ))}
        </div>
        <WeatherDisplay city={city} data={weatherData}></WeatherDisplay>
      </div>
    );
  }
}

export default App;
