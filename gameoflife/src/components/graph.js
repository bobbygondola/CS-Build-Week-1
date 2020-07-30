import React from 'react';
import { useState, useCallback, useRef, useEffect } from 'react';
import produce from 'immer'

//Study Forever

const numRows = 60;
const numCols = 100;

const generateEmptyGrid = () => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            //push to rows, Array.from ->, fill all ele's in arrays with 0's, to len of numCols
            rows.push(Array.from(Array(numCols), () => 0))
        }
        return rows
}

// function refreshPage() {
//     window.location.reload(false);
//   }

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
    // set grid in state to the GenerateEmptyGrid() fn ^^
    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid()
    });
    console.log("Grid created in state! -> ",grid);

    {/* STATE DRIVEN VARIABLES */}

    const [speed, setSpeed] = useState(87);

    const [seconds, setSeconds] = useState(0)

    const [running, setRunning] = useState(false);  //used for start button after getting grid toggleable


    // FOR TIMING
    useEffect(() => {
    if (running) {
      const intervalId = window.setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1500);
      return () => window.clearInterval(intervalId);
        }
    }, [running]);

    // useRef hook. runningRef = current value of running. (true or false)
    const runningRef = useRef(running);
    runningRef.current = running


    // to get the start button to work
    /* RUN SIMULATION FN & NEIGHBOR CHECKER */

    const runSimulation = useCallback(() => {
            //if were not runnng, return.
        if (!runningRef.current){
            return
        }

        //updating [grid, setGrid]
          // g = current value - on immer produce fn
        setGrid(g => { 
            return produce(g, gridCopy => {
              //gridCopy will be updated now based on..
              for (let i = 0; i < numRows; i++) {
                for (let k = 0; k < numCols; k++) {
                  let neighbors = 0;
                  // neighbor position values are operations
                  // compute the number of neighbors we have
                  operations.forEach(([x, y]) => {
                    const newI = i + x;
                    const newK = k + y;
                    //make sure we dont go out of bounds
                    if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                      neighbors += g[newI][newK];
                    }
                  });

                  // then we see what happens to the cell
                  if (neighbors < 2 || neighbors > 3) {
                    gridCopy[i][k] = 0;
                  } else if (g[i][k] === 0 && neighbors === 3) {
                    gridCopy[i][k] = 1;
                  }
                }
              }
            });
          });
          
          // recursively call to our speed
          setTimeout(runSimulation, speed);
          console.log(speed)
        }, []);
    
    return (
        <>
        {/* BUTTONS */}


        <div className="simulationButtons">
        <button
        // start sim
            onClick={() => {
            setRunning(!running);
            if(!running){
            runningRef.current = true;
            //run simulation
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

        {/* RANDOM SIM*/}
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
        <div className = "simulation"
            /* Display grid, repeat is column number. 10px too. */
            style={{
            display:'grid',
            gridTemplateColumns: `repeat(${numCols}, 10px)`
            }}>
            {/* Displaying the grid, by grid.map => rows.map
            get index of row and column, [i][k] if alive.. black
            if dead..undefined..no color. Using index as key*/}
            {grid.map((rows, i) =>
                rows.map((col, k) => 
                    <div 
                    key={`${i}-${k}`}
                    // make each div clickable. Set current index to a 1
                    // update at position [i][k]
                    // could use grid[i][k] = 1 - but we use immer-produce()
                    onClick={() => {
                                      // pass our current grid
                                      //    and alter the grid copy
                        const newGrid = produce(grid, gridCopy => {
                                        // toggle at position [i][k]
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