import React, { useEffect, useState } from 'react';
import './style.css';
import Line from './Line';

export default function App() {
  const [solution, setSolution] = useState('WORLD');
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleType = (e) => {
      if (gameOver) {
        return;
      }
      if (e.key === 'Enter') {
        if (currentGuess.length < 5) {
          return;
        }
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess('');
        const isCorrect = currentGuess === solution;
        if (isCorrect) {
          setGameOver(true);
        }
      }
      if (e.key === 'Backspace') {
        setCurrentGuess(currentGuess.slice(0, -1));
      }
      if (currentGuess.length >= 5) {
        return;
      }
      const isLetter = e.key.match(/^[a-z]{1}$/) !== null;
      if (isLetter) {
        setCurrentGuess((prev) => prev + e.key);
      }
    };
    window.addEventListener('keydown', handleType);
    return () => window.removeEventListener('keydown', handleType);
  }, [currentGuess, gameOver, solution]);

  return (
    <div className="App">
      <div className="board">
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex((val) => val == null);
          return (
            <Line
              key={i}
              currentGuess={isCurrentGuess ? currentGuess : guess ?? ''}
              solution={solution}
              isFinal={!isCurrentGuess && guess !== null}
            />
          );
        })}
      </div>
      <p>RANDOM WORD IS : {solution}</p>
    </div>
  );
}
