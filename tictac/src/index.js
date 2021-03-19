import React from "react";
import ReactDOM from "react-dom";
import './index.css';

const Square = (props) => {
  return (
    <button
      className="square"
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  handleClick(i) {
    const turn = this.state.turn;
    const squares = [...this.state.squares];

    if(calculateWinner(squares) || squares[i]) 
      return;

    squares[i] = turn ? 'X' : 'O';
    this.setState({squares: squares, turn: !turn});
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />  
    );
  }

  render() {
    

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      turn: true,
    }
  }

  
  render() {

    const history = this.state.history;
    const current = history[history.length - 1];

    const winner = calculateWinner(current.squares);
    let status = winner? 'Winner: ' + winner : 'Next player: ' + (this.state.turn? 'X': 'O');

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={this.state.history[this.state.history.length - 1].squares}
            turn={this.state.turn}
            // onClick={() => handleClick()}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  