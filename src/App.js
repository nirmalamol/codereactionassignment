import React, { Component } from "react";
import HomePage from "./components/HomePage";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={HomePage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
