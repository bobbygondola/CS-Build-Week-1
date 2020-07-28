import React from 'react'

const Rules = () => {
    return (
        <div className="rulesComponent">
            <div className="rulesTxt">
            <h3>How to Use:</h3>
            <h5>Try - Try 5 squares in a straight line! Then start!</h5>
            <p>Click on squares or use <strong>RANDOM</strong> to simulate living organisms and if they will
                reproduce or not. Try different strategies to keep them alive. Press <strong>STOP SIMULATION </strong>
                 before running again. Enjoy the original idea created by <strong>John Conway</strong>, Programmed by <strong>Robert Gondola</strong>
            </p>
            <p>-</p>
            <h4>Rule 1</h4>
            <p>Any live cell with fewer than two live neighbours dies, underpopulation.</p>
            <h4>Rule 2</h4>
            <p>Any live cell with two or three live neighbours lives on to the next generation.</p>
            <h4>Rule 3</h4>
            <p>Any live cell with more than three live neighbours dies, overpopulation.</p>
            <h4>Rule 4</h4>
            <p>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</p>
            </div>
            <h6>Github - <a href="https://github.com/bobbygondola">Robert Gondola</a></h6>
            <h6>Linkedin - <a href="https://www.linkedin.com/in/robert-gondola-6455781a3/">Robert Gondola</a></h6>
            <h6>Portfolio - <a href="https://portfolio-henna-three.vercel.app/bobbygondola">www.RobertGondolaUSA.com</a></h6>
            <p><a href="mailto:bobertgondola@gmail.com">Send Me An Email!</a></p>
        </div>
    )
}

export default Rules
