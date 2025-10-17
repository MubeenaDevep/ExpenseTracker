import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '⌫') {
      setInput(input.slice(0, -1));
    } else if (value === '=') {
      try {
           setResult(Function(`"use strict"; return (${input})`)().toString());
      } catch {
        setResult('Error');
      }
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    'C', '⌫', '/', '*',
    '7', '8', '9', '-',
    '4', '5', '6', '+',
    '1', '2', '3', '=',
    '0', '.',
  ];

  return (
    <div className="flex justify-center items-start">
      <div className="bg-[#f9f3e7] border border-[#c9b79c] p-6 rounded-xl shadow-md w-80">
        {/* Display */}
        <div className="mb-4">
          <div className="text-right text-xl font-serif break-words min-h-[48px] text-[#5a4634]">
            {input || '0'}
          </div>
          <div className="text-right text-sm text-[#8b7355] font-serif">
            {result}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(btn)}
              className={`py-3 rounded-lg text-lg font-bold font-serif transition 
                ${
                  btn === '='
                    ? 'bg-[#c9b79c] text-white hover:bg-[#b0a084]'
                    : btn === 'C'
                    ? 'bg-[#d36b6b] text-white hover:bg-[#b85a5a]'
                    : btn === '⌫'
                    ? 'bg-[#e0b76d] text-white hover:bg-[#c9a25d]'
                    : 'bg-[#fdf6e3] border border-[#c9b79c] text-[#5a4634] hover:bg-[#f2ebd9]'
                }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
