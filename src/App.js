import React, { Component } from 'react';
import './App.css';

import Seohafont from './seohafont.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Seohafont text="ABCDEF" text_width="30" text_height="60">
          ABCDE
        </Seohafont>
      </div>
    );
  } // 앱
}

//this will be ignored

export default App;
