import React from "react";
import "../App.css";

interface myProps {
  city: string;
  data: any;
}

const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

class WeatherDisplay extends React.Component<myProps, {}> {
  render() {
    const { city, data } = this.props;
    if (!city || !data) {
      return <h1>Loading</h1>;
    }
    let weatherData = [...data];
    weatherData.shift();
    return (
      <div className="weatherComponent">
        <div className="today-container">
          <h3>Today</h3>
          <div className="today-information">
            <div>Icon</div>
            <div>
              <p>{data[0].temp}</p>
              <p>Clouds</p>
            </div>
          </div>
        </div>
        <div className="week-container">
          {weatherData.map((data: any) => (
            <div className="weekday-information">
              <h3>{days[new Date(data.day * 1000).getDay()]}</h3>
              <div>icon</div>
              {data.temp}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default WeatherDisplay;
