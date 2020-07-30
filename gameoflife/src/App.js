import React from 'react';
import './App.css';
import Rules from './components/rules';
import Graph from './components/graph';
import Info from './components/info'

const App = () => {
  return (
    <div className="App">
      <div className="introHome">
      <h1>Game Of Life Simulation</h1>
      <p>"Conways Game Of Life" Simulates Cellular Automation</p>
      <h5>Programmed by <a href="https://www.linkedin.com/in/robert-gondola-6455781a3/">Robert Gondola</a> - click me!</h5>
      
      </div>
      <div className = "homeComponent">
        <Graph />
        <Rules />
      </div>
      <Info />
    </div>
  );
}

export default App;
