import React from "react";
import "../App.css";

interface myProps {
  city: string;
  fourDaysData: any;
  todayData: any;
}
// Day map for getting days from UNIX timestamp
const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

class WeatherDisplay extends React.Component<myProps, {}> {
  render() {
    const { city, fourDaysData, todayData } = this.props;
    if (!city || !fourDaysData || !todayData) {
      return <h1>Loading</h1>;
    }

    let weatherData = [...fourDaysData];
    return (
      <div className="weatherComponent">
        <div className="today-container">
          <h3>Today</h3>
          <div className="today-information">
           <img src={`http://openweathermap.org/img/w/${todayData.data.weather[0].icon}.png`} alt="icon not available"></img>
            <div>
              <p className="today-temp-value">{Math.round(todayData.data.main.temp)}°</p>
              <p className="today-weather-string">{todayData.data.weather[0].main}</p>
            </div>
          </div>
        </div>
        <div className="week-container">
          {weatherData.map((data: any) => (
            <div className="weekday-information">
              <h3>{days[new Date(data.day * 1000).getDay()]}</h3>
              <img src={`http://openweathermap.org/img/w/${data.icon}.png`} alt="icon not available"></img>
              <p className="weekly-temp-value">{data.temp}°</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default WeatherDisplay;
