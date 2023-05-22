import React, { useState, useEffect } from 'react';

const Line = ({ currentGuess, solution, isFinal }) => {
  let row = [];
  let wordLength = 5;
  let className = 'tile';

  for (let i = 0; i < wordLength; i++) {
    const char = currentGuess[i] ? currentGuess[i].toUpperCase() : '';
    if (isFinal) {
      if (char === solution[i]) {
        className += ' correct';
      } else if (solution.includes(char)) {
        className += ' close';
      } else {
        className += ' incorrect';
      }
    }
    row.push(
      <div className={className} key={i}>
        {char}
      </div>
    );
  }
  return <div className="line">{row}</div>;
};
export default Line;
