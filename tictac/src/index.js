import React from "react";
import ReactDOM from "react-dom";
import './index.css';

const Square = (props) => {
 return (
   <button className="square"
    onClick={props.onClick}
   >
     {props.value}
   </button>
 )
}

class Board extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     board: Array(9).fill(null),
  //     turn: true,
  //   }
  // }

  // handleClick(i) { 
  //   const turn = this.state.turn;
  //   let board = [...this.state.board];

  //   if (calculateWinner(board) || board[i])
  //     return;

  //   board[i] = turn? 'X': 'O';
  //   this.setState({board: board, turn: !turn});
  // }

  renderSquare(i) {
    return (
      <Square 
        value={this.props.board[i]} 
        onClick={() => this.props.onClick(i)}
      ></Square>
    )
  };

  render() {
  //   const board = this.state.board;
  //   const winner = calculateWinner(board);
  //   const status = winner? 'Winner:' + winner: (this.state.turn? 'X': 'O') + '\'s turn.';
    
    return (
      
      <div>
        {/* <div>{status}</div> */}
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
      history: [
        {
          board: Array(9).fill(null),
        }
      ],
      step: 0,
    }
  }

  handleClick(i) {
    // const step = this.state.step;
    let history = [...this.state.history];
    let board = [...history[history.length-1].board];
    let turn = this.state.step%2===0;

    if (calculateWinner(board) || board[i])
      return;

    board[i] = turn? 'X': 'O';

    this.setState(
      {
        history: history.concat({board: board}),
        turn: !turn,
        step: history.length,
      }
    )
  }

  jumpTo(i) {
    let history = [...this.state.history];
    history = history.slice(0, i+1);
    console.log(history[i].board)
    let turn = i%2===0;
    this.setState({
      history: history,
      turn: turn,
    })
  }

  render() {

    const history = this.state.history;
    const board = history[history.length-1].board;
    
    const winner = calculateWinner(board);
    const endgame = this.state.step === 8;
    let status = undefined;
    if (winner) {
      status = 'Winner is: ' + winner;
    } 
    else if (endgame) {
      status = 'Tie';
    }
    else {
      status = 'Turn: ' + (this.state.turn? 'X' : 'O');
    }


    const moves = history.map((move, i) => {
      const desc = i? 'Goto move #' + i: "Goto start";
      return (
        <li
          key={i}
        >
          <button onClick={() => this.jumpTo(i)}>{desc}</button>
        </li>
      )
    });


    return (
      <div className="game">
        <div className="game-board">
          <Board 
            board={board}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
  