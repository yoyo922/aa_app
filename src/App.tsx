import "./App.css";
import React from "react";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="city-header">
          <button>OTTAWA</button>
          <button>MOSCOW</button>
          <button>TOKYO</button>
        </div>
      </div>
    );
  }
}

export default App
