import React from 'react';
import './Game.css';
import * as api from './api.js'

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;


class Cell extends React.Component {

    render() {
        const { x, y } = this.props;
        return (
            <div className="Cell" style={{
                left: `${CELL_SIZE * x + 1}px`,
                top: `${CELL_SIZE * y + 1}px`,
                width: `${CELL_SIZE - 1}px`,
                height: `${CELL_SIZE - 1}px`,
            }} />
        );
    }
}


class Game extends React.Component {

  rows = HEIGHT / CELL_SIZE;
  cols = WIDTH / CELL_SIZE;

    constructor() {
        super();
        this.setState({ id: api.newBoard(this.rows, this.cols, []) });
    }

    state = {
        id: "",
        cells: [],
        isRunning: false,
        interval: 100,
    };

    getElementOffset = () => {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    };

    handleClick = (event) => {

        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        
        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        this.setState({ cells: api.toggle(this.state.id, x, y) });
    };

    runGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
    };

    stopGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    };

    runIteration() {
        this.setState({ cells: api.nextGeneration(this.state.id) });

        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
        }, this.state.interval);
    }

    handleIntervalChange = (event) => {
        this.setState({ interval: event.target.value });
    };

    handleClear = () => {
      this.setState({
        cells: [],
        id: api.newBoard(this.rows, this.cols, [])
      });
    };

    handleRandom = () => {
        let cells = []
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (Math.random() >= 0.8) cells.push({x:x, y:y})
            }
        }

      this.setState({
        cells: cells,
        id: api.newBoard(this.rows, this.cols, cells)
      });
    };

    render() {
        const { cells, interval, isRunning } = this.state;
        return (
            <div>
                <div className="Board"
                    style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
                    onClick={this.handleClick}
                    ref={(n) => { this.boardRef = n; }}>

                    {cells.map(cell => (
                        <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                    ))}
                </div>

                <div className="controls">
                    Update every <input value={interval} onChange={this.handleIntervalChange} /> msec
                    {isRunning ?
                        <button className="button" onClick={this.stopGame}>Stop</button> :
                        <button className="button" onClick={this.runGame}>Run</button>
                    }
                    <button className="button" onClick={this.handleRandom}>Random</button>
                    <button className="button" onClick={this.handleClear}>Clear</button>
                </div>
            </div>
        );
    }
}


export default Game;