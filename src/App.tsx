import "./App.css";
import React from "react";

interface myState {
  city: string
}

const cities = ["Ottawa", "Moscow", "Tokyo"];

class App extends React.Component<{}, myState> {
  constructor(props: any) {
    super(props);
    this.state = {
      city: "Ottawa",
    };
  }

  /**
   * call back to handle onclick event to select cities
   * will set component to be the user selected city
   * @param e - button click event
   */
  setCity = (e: any) => {
    this.setState({
      city: e.target.name,
    });
  };

  render() {  
    return (
      <div className="App">
        <div className="city-header">
          {cities.map((city) => (
            <button
              key={city}
              className={this.state.city === city ? "selected" : ""}
              name={city}
              onClick={this.setCity}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
