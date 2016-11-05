import React, { Component } from 'react';
import logo from './Flag_of_the_United_States.svg';
import './App.css';
import Demographic from './Demographic';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h2>#HackThePayGap</h2>
          <h1>Demographic Income Distribution Explorer</h1>
        </div>
        {/*<p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>*/}
        <Demographic/>
      </div>
    );
  }
}

export default App;
