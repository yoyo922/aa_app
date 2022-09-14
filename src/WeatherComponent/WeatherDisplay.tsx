import React from "react";
import "../App.css";

interface myProps {
  city: string;
  data: any;
}

class WeatherDisplay extends React.Component<myProps, {}> {
  render() {
    const { city, data } = this.props;
    if (!city || !data) {
      return <h1>Loading</h1>;
    }
    let weatherData = [...data];
    weatherData.shift();
    console.log("the data is", weatherData);
    return (
      <div className="weatherComponent">
        <p>{city}</p>
        <div className="today-container">
          <h3>Today</h3>
          <div className="today-information">
            <div>Icon</div>
            <div>
              <p>19 degrees</p>
              <p>Clouds</p>
            </div>
          </div>
        </div>
        <div className="week-container">{
          weatherData.map((data: any)=>(
            <h1>
              {data.main.temp}
            </h1>
          ))
        }</div>
      </div>
    );
  }
}

export default WeatherDisplay;
