'use client';

import React, { useEffect, useState } from 'react';
import PushButton from '../components/PushButton';

const TicTacToe: React.FC = () => {
  const [cells, setCells] = useState(Array(9).fill(''));
  const [currentMark, setCurrentMark] = useState('');
  const [message, setMessage] = useState('Choose your player:');
  const [gameActive, setGameActive] = useState(false);
  const [playerMark, setPlayerMark] = useState('');

  const resetGrid = () => {
    setCells(Array(9).fill(''));
    setCurrentMark('');
    setMessage('Choose your player:');
    setGameActive(false);
  };

  const handleCellClick = (index: number) => {
    if (!cells[index] && gameActive) {
      const newCells = [...cells];
      newCells[index] = currentMark;
      setCells(newCells);

      if (checkWinner(newCells, currentMark)) {
        setMessage(`${currentMark} is the winner!`);
        return;
      }

      if (isBoardFull(newCells)) {
        setMessage("It's a tie!");
        return;
      }

      setCurrentMark(currentMark === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (cells: string[], mark: string): boolean => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (cells[a] === mark && cells[b] === mark && cells[c] === mark) {
        return true;
      }
    }
    return false;
  };

  const isBoardFull = (cells: string[]): boolean => {
    return cells.every(cell => cell !== '');
  };

  const computerMove = () => {
    const emptyCells = cells.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      handleCellClick(emptyCells[randomIndex] as number);
    }
  };

  const handlePlayerChoice = (mark: string) => {
    setCurrentMark(mark);
    setPlayerMark(mark)
    setMessage(`${mark}, click on a square to make your move!`);
    setGameActive(true);
  };

  useEffect(() => {
    if (gameActive && currentMark != playerMark) {
      setTimeout(() => {
        computerMove();
      }, 600);
    }
  }, [currentMark, gameActive]);

  return (
    <div className="flex flex-col items-center md:p-4 w-full h-full justify-center overflow-hidden">
      <div className="message text-4xl font-semibold mb-4 text-white md:whitespace-nowrap pb-4 text-center">{message}</div>
      {!currentMark && (
        <div className="flex space-x-8 mb-6 p-8">
          <div
            className="text-6xl font-bold text-white cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={() => handlePlayerChoice('X')}
          >
            X
          </div>
          <div
            className="text-6xl font-bold text-white cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={() => handlePlayerChoice('O')}
          >
            O
          </div>
        </div>
      )}

      {currentMark && (
        <>
          <ul className="grid grid-cols-3 gap-0 md:w-[70vw] md:h-[60vh] w-[90vw] h-[30vh] pb-4">
            {cells.map((cell, index) => (
              <li
                key={index}
                className={`flex items-center justify-center text-5xl font-bold cursor-pointer
                ${cell === 'X' ? 'text-white font-mono' : cell === 'O' ? 'text-white font-mono' : ''}
                ${getBorderStyles(index)}`}
                onClick={() => handleCellClick(index)}
              >
                {cell}
              </li>
            ))}
          </ul>
          <PushButton
            text="Reset"
            onClick={resetGrid}/>
        </>
      )}
    </div>
  );
};

const getBorderStyles = (index: number) => {
    const topBorder = index > 2 ? 'border-t-2 border-white' : '';
    const bottomBorder = index < 6 ? 'border-b-2 border-white' : '';
    const leftBorder = index % 3 !== 0 ? 'border-l-2 border-white' : '';
    const rightBorder = index % 3 !== 2 ? 'border-r-2 border-white' : '';

    return `${topBorder} ${bottomBorder} ${leftBorder} ${rightBorder}`;
  };

export default TicTacToe;

