import React, { Component } from 'react';
import ReactVersion from './React/index';
import FluxVersion from './Flux/index'
import ReduxVersion from './Redux/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactVersion/>
        <FluxVersion/>
        <ReduxVersion/>
      </div>
    );
  }
}

export default App;
