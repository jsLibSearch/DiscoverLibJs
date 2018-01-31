import React, { Component } from 'react';
import './App.css';
import { customColors as c } from './custom/colors.js';
import { Route } from 'react-router-dom';
import Header from './components/header.js'

class App extends Component {
  render() {
    console.log(c);
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
