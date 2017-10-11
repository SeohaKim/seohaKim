import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Seohafont from './seohafont.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Seohafont text="ABCDEF">SEOHA KIM</Seohafont>
      </div>
    );
  }
}
//this will be ignored

export default App;
