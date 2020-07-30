# Welcome to the Game of Life.
- Follow the rules provided

# Code Documentation

- 1. Create React App
- 2. Inside Graph Fn.. we have to create a grid of sorts. We can do this by setting the grid to the state of an empty grid numRows x numCols. Fill with 0’s - generateEmptyGrid().
- 3. We then grid.map and row.map to display the grid visually. Set boundaries to make it fit on page, styles/color/px height. Grab index of row,col [i][k] onClick.. Toggle between dead and alive. 1 or 0. We don't want to mutate so we use immers produce(g, copy) to make a copy and do our work on that.
- 4. At this point we have a grid and we can click on individual squares[i][k] to make them alive(1). Not mutating..Now we have to make a running simulation.
- 5. Set running to false in state, make a button changing running state and if running=true, runSimulation().
- 6. We must create a runSimulation() Fn now. It will include setting the grid state basically.
- 7. If runningRef.current is false, return. Else, Create a copy with produce(), and double for loop Cols,Rows. We now need to check neighbors to enforce the rules of life. We do this with the [operations] array. operations.forEach[x,y], Find out how many neighbors we have.
- 8. Now we must see if our cells die or live using our logic. Overpopulation/underpopulation/else. Set speed in a variable.
- 9. At this point we have a working game of life. We must now add buttons to clear the board, add speed, decrease speed, presets and random seeding.
- 10. At this point, styling is all we need!
