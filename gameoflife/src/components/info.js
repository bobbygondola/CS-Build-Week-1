import React from 'react'

const Info = () => {
    return (
        <div className="infoComponent">
            <h2>About This Algorithm</h2>
            <p>The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state,
                 requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.</p>
                 <p>-</p>
            <p>John Conway explained in an interview how the idea for this came came about when talking about colonizing Mars. The idea of sending robots to harvest Iron, smelt said Iron and create new robots to recursively repeat the process. Ultimately creating many robots, with the help of smelting the iron, using its by product to produce oxygen, they can create and compress an atmosphere to sustain life. This was not a Computer Science algorithm but a logical one. I continue that curiosity through my work and development. Rest In Peace, John Conway.</p>
                 <p>-</p>
            <p>i.e - create nodes, watch how they evolve over time based on set rules.</p>
        </div>
    )
}

export default Info