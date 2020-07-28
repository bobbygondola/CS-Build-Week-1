import React from 'react';
import { useState, useCallback, useRef, useEffect } from 'react';
import produce from 'immer'

const numRows = 60;
const numCols = 100;

const generateEmptyGrid = () => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0))
        }
        return rows
}

function refreshPage() {
    window.location.reload(false);
  }

const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
  ];

const Graph = () => {
    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid()
    });

    {/* STATE DRIVEN VARIABLES */}

    const [speed, setSpeed] = useState(87);

    const [seconds, setSeconds] = useState(0)

    const [running, setRunning] = useState(false);


    {/* FOR TIMING */}

    useEffect(() => {
    if (running) {
      const intervalId = window.setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1500);
      return () => window.clearInterval(intervalId);
        }
    }, [running]);

    const runningRef = useRef(running);
    runningRef.current = running

    {/* RUN SIMULATION FN & NEIGHBOR CHECKER */}

    const runSimulation = useCallback(() => {
        if (!runningRef.current){
            return
        }

        setGrid(g => {
            return produce(g, gridCopy => {
              for (let i = 0; i < numRows; i++) {
                for (let k = 0; k < numCols; k++) {
                  let neighbors = 0;
                  operations.forEach(([x, y]) => {
                    const newI = i + x;
                    const newK = k + y;
                    if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                      neighbors += g[newI][newK];
                    }
                  });
      
                  if (neighbors < 2 || neighbors > 3) {
                    gridCopy[i][k] = 0;
                  } else if (g[i][k] === 0 && neighbors === 3) {
                    gridCopy[i][k] = 1;
                  }
                }
              }
            });
          });
      
          setTimeout(runSimulation, speed);
          console.log(speed)
        }, []);
    
    return (
        <>
        {/* BUTTONS */}


        <div className="simulationButtons">
        {/* START SIM*/}
        <button
            onClick={() => {
            setRunning(!running);
            if(!running){
            runningRef.current = true;
            runSimulation()
            }
            
        }}
        >
            {running ? 'Stop Simulation' : 'Start Simulation'}
        </button>

        {/* CLEAR SIM*/}
        <button onClick={() => {
            setGrid(generateEmptyGrid())
            setSeconds(0)
        }}>
        Clear Simulation </button>

        {/*ADD RESET SPEED!!!!!!!!!!!!!!!!!!!!!!!!!! */}
        <button onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
                rows.push(Array.from(Array(numCols), () => Math.random() > 0.8 ? 1 : 0))
            }
            setGrid(rows)
            setSpeed(87)
        }}
        >
        Random Simulation </button>
        </div>


        {/* GRID AND SIMULATION */}

        <div className="graphStats">
        <div className = "simulation" style={{
            display:'grid',
            gridTemplateColumns: `repeat(${numCols}, 10px)`
        }}>
            {grid.map((rows, i) =>
                rows.map((col, k) => 
                    <div 
                    key={`${i}-${k}`}
                    onClick={() => {
                        const newGrid = produce(grid, gridCopy => {
                            gridCopy[i][k] = grid[i][k] ? 0 : 1;
                        })
                        setGrid(newGrid)
                    }}
                        style={{
                        width:10,
                        height:10,
                        backgroundColor: grid[i][k] ? 'black' : undefined,
                        border: '1px solid black'
                        }}
                    />
                )
            )}
        </div>

        {/* STATS */}
        {/*FAST & SLOW BUTTONS */}

        <div className="stats">
        <p>Current Years/Second Speed: <strong>{speed} years/s</strong></p>
        <p>Time Passed: <strong>{seconds * speed} years</strong></p>
        <p>Generations: <strong>{seconds}</strong></p>

        <button onClick={() => 
            setSpeed(speed + 10)
        }>
            Time Speed + 10 (years/sec)
        </button>
        
        <button onClick = {() => {
            setSpeed(speed - 10)
        }}>
            Time Speed - 10 (years/sec)
        </button>
        </div>
        
        </div>
    </>
    )
}

export default Graph