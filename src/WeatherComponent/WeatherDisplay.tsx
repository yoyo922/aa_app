import React from "react";
import "../App.css";

interface myProps {
  city: string;
  fourDaysData: any;
}
// Day map for getting days from UNIX timestamp
const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

class WeatherDisplay extends React.Component<myProps, {}> {
  render() {
    const { city, fourDaysData } = this.props;
    if (!city || !fourDaysData) {
      return <h1>Loading</h1>;
    }

    let weatherData = [...fourDaysData];

    return (
      <div className="weatherComponent">
        <div className="today-container">
          <h3>Today {days[new Date(weatherData[0].day * 1000).getDay()]}</h3>
          <div className="today-information">
            <img
              src={`http://openweathermap.org/img/w/${weatherData[0].icon}.png`}
              alt="icon not available"
            ></img>
            <div>
              <p className="today-temp-value">
                {Math.round(weatherData[0].temp)}°
              </p>
              <p className="today-weather-string">
                {weatherData[0].weather}
              </p>
            </div>
          </div>
        </div>
        <div className="week-container">
          {weatherData.map((data: any, index) => {
            if (index > 0) {
              return (
                <div key={data.day} className="weekday-information">
                  <h3>{days[new Date(data.day * 1000).getDay()]}</h3>
                  <img
                    src={`http://openweathermap.org/img/w/${data.icon}.png`}
                    alt="icon not available"
                  ></img>
                  <p className="weekly-temp-value">{data.temp}°</p>
                </div>
              );
            } else {
              return ''
            }
          })}
        </div>
      </div>
    );
  }
}

export default WeatherDisplay;
