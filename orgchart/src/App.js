import React, { Component } from 'react';
import './App.css';
import HierarchyMap from './components/HierarchyMap';
import Header from './components/Header';

// @module Dunder Mifflin Org Chart

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <HierarchyMap />
      </div>
    );
  }
}

export default App;