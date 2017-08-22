import React, { Component } from 'react';
import ReactVersion from './React/index';
import FluxVersion from './Flux/index'
import ReduxVersion from './Redux/index';
import ReduxContainer from './ReduxContainer/index';
import ReduxContext from './ReduxContext';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactVersion/>
        <FluxVersion/>
        <ReduxVersion/>
        <ReduxContainer/>
        <ReduxContext/>
      </div>
    );
  }
}

export default App;
