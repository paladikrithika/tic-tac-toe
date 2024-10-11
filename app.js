import React, { useState } from 'react';
import './App.css';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [playerNames, setPlayerNames] = useState({ playerX: '', playerO: '' });
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  const handleClick = (index) => {
    if (squares[index] || winner || isDraw) return;

    const newSquares = [...squares];
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const handleSubmitNames = (e) => {
    e.preventDefault();
    setNameSubmitted(true);
  };

  const getSquareClass = (index) => {
    const winner = calculateWinner(squares);
    if (winner && winner.line.includes(index)) {
      return 'square winner'; 
    }
    return 'square';
  };

  return (
    <div className="App">
      {!nameSubmitted ? (
        <div className="input-page">
          <form className="input-form" onSubmit={handleSubmitNames}>
            <h2>Enter Player Names</h2>
            <input
              type="text"
              placeholder="Player X Name"
              value={playerNames.playerX}
              onChange={(e) => setPlayerNames({ ...playerNames, playerX: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Player O Name"
              value={playerNames.playerO}
              onChange={(e) => setPlayerNames({ ...playerNames, playerO: e.target.value })}
              required
            />
            <button type="submit">Start Game</button>
          </form>
        </div>
      ) : (
        <>
          <h1>Tic-Tac-Toe</h1>
          <p>Current Player: {isXNext ? playerNames.playerX || 'X' : playerNames.playerO || 'O'}</p>
          <div className="board">
            {squares.map((square, index) => (
              <div
                className={getSquareClass(index)}
                key={index}
                onClick={() => handleClick(index)}
              >
                {square}
              </div>
            ))}
          </div>
          {winner ? (
            <p className="winner">
              Winner: {winner.player === 'X' ? playerNames.playerX || 'X' : playerNames.playerO || 'O'}
            </p>
          ) : isDraw ? (
            <p className="winner">It’s a draw!</p>
          ) : (
            <p>Next Player: {isXNext ? 'X' : 'O'}</p>
          )}
          <button className="reset-button" onClick={resetGame}>Restart Game</button>
        </>
      )}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: lines[i] };
    }
  }
  return null;
}

export default App;
