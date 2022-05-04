import React, { useState } from "react";
import Header from "./Header";
import Board from "./Board";
import calculateWinner from "./calculateWinner";

const Game = () => {
  const [state, setState] = useState({
    history: [
      {
        squares: Array(9),
      },
    ],
    step: 0,
    isX: true,
  });

  const next = (step) => {
    setState({
      history: history,
      step: step,
      isX: step % 2 === 0,
    });
  };

  const handleClick = (i) => {
    const history = state.history.slice(0, state.step + 1);
    const current = history[history.length - 1];
    const squaresCopy = current.squares.slice();

    if (squaresCopy[i] === undefined) {
      if (calculateWinner(squaresCopy) || squaresCopy[i]) {
        return;
      } else {
        squaresCopy[i] = state.isX ? "X" : "O";
        setState({
          history: history.concat([
            {
              squares: squaresCopy,
            },
          ]),
          step: history.length,
          isX: !state.isX,
        });
      }
    } else {
      return alert("Please select another square");
    }
  };

  const history = state.history;
  const current = history[state.step];
  const winner = calculateWinner(current.squares);

  const prevMoves = history.map((step, move) => {
    console.log("the"+move)
    console.log(move===0)
    if (move===0) {
      return (
        <div className="col-10 reset" key={move} onClick={() => next(move)}>
          <i>Clear the Board</i>
        </div>
      );

    }
    return (
      <div className="col-3 move" key={move} onClick={() => next(move)}>
        <p>Play {move}</p>
      </div>
    );
  });

  function Player({ upNext }) {
    console.log(winner);
    if (winner) {
      return (
        <div className="playerWon">
          <h1>{winner} has won the game!</h1>
        </div>
      );
    } else {
      return (
        <div className="player">
          <h3>
            <i>It is currently {upNext}'s turn</i>
          </h3>
        </div>
      );
    }
  }

  return (
    <>
      <Header />
      <div className="boardSection">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <Player upNext={state.isX ? "X" : "O"} />
      <hr />
      <h3 className="historyHead">History</h3>
      <div className="historyCont">{prevMoves}</div>
    </>
  );
};

export default Game;
