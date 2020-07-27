import React from 'react';
import logo from './logo.svg';
import './App.css';
import Rules from './components/rules'
import Graph from './components/graph'

const App = () => {
  return (
    <div className="App">
      <h1>Game Of Life Simulation</h1>
      <p>"Conways Game Of Life" Simulates Cellular Automation on the spread of living organisms.</p>
      <div className = "homeComponent">
        <Graph />
        <Rules />
      </div>
    </div>
  );
}

export default App;
