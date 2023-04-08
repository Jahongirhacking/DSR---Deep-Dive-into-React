import React from 'react'
import Square from './Square'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isTurnX: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.getHelp = this.getHelp.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  handleClick(index) {
    if(this.state.squares[index] || this.checkWinner()) return;
    const newSquares = [...this.state.squares];
    newSquares[index] = this.state.isTurnX ? 'X' : 'O';
    this.setState({squares: newSquares, isTurnX: !this.state.isTurnX});
  }

  checkWinner = () => {
    const checker = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];

    for(let check of checker) {
      const [e1, e2, e3] = check;
      if (
        this.state.squares[e1] &&
        this.state.squares[e1] === this.state.squares[e2] &&
        this.state.squares[e2] === this.state.squares[e3]
      )
        return this.state.squares[e1];
    }
    return null;
  }

  getStatus() {
    let status;
    const winner = this.checkWinner();
    if(winner) {
      status = "Congratulations, Winner is " + winner + "!";
    } else {
      let flag = true;
      for(let square of this.state.squares) flag &= (square!==null);
      if(!flag) status = (this.state.isTurnX ? "X" : "O") + "'s Turn";
      else status = "Friendly Draw!";
    }
    return status;
  }

  getHelp() {
    const emptyPlaces = [];
    for(let index=0; index<9; index++) {
      if(this.state.squares[index]===null) {
        emptyPlaces.push(index);
      }
    }
    if(emptyPlaces.length>0) {
      const randomIndex = Math.floor(Math.random() * emptyPlaces.length);
      this.handleClick(emptyPlaces[randomIndex]);
    }
  }

  startNewGame() {
    this.setState({squares: Array(9).fill(null), isTurnX: true});
  }
  
  render() {
    return (
      <div className="game">
        <div className="status">{this.getStatus()}</div>
        <div className="help">
          <button onClick={this.getHelp}>Help</button>
        </div>
        <div className="newGame">
          <button onClick={this.startNewGame}>Start New Game</button>
        </div>
        <div className="game-field">
          <div className="row r1">
            <Square value={this.state.squares[0]} handleClick={() => this.handleClick(0)} />
            <Square value={this.state.squares[1]} handleClick={() => this.handleClick(1)} />
            <Square value={this.state.squares[2]} handleClick={() => this.handleClick(2)} />
          </div>
          <div className="row r2">
            <Square value={this.state.squares[3]} handleClick={() => this.handleClick(3)} />
            <Square value={this.state.squares[4]} handleClick={() => this.handleClick(4)} />
            <Square value={this.state.squares[5]} handleClick={() => this.handleClick(5)} />
          </div>
          <div className="row r3">
            <Square value={this.state.squares[6]} handleClick={() => this.handleClick(6)} />
            <Square value={this.state.squares[7]} handleClick={() => this.handleClick(7)} />
            <Square value={this.state.squares[8]} handleClick={() => this.handleClick(8)} />
          </div>
        </div>
      </div>
      )
  }
}

export default App;
