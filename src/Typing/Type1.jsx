import React, { useState, useEffect, useRef } from 'react';

export default function app() {
  const paragraphs = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
  ];

  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [words, setWords] = useState([]);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const inputRef = useRef(null);

  useEffect(() => {
    // When the component mounts or the paragraph changes, set the words and highlight the first word
    const words = paragraphs[paragraphIndex].split(' ');
    setWords(words);
    setHighlightedWordIndex(0);
  }, [paragraphIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setIsTimerRunning(false);
      inputRef.current.disabled = true;
    }
  }, [timer , highlightedWordIndex]);


  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (!isTimerRunning || inputRef.current.disabled) {
      return;
    }

    if (event.key === ' ') {
      event.preventDefault();
      const typedWord = inputValue.trim();
      const expectedWord = words[highlightedWordIndex];
      if (typedWord === expectedWord) {
        // Word is typed correctly, move to the next word
        setHighlightedWordIndex((prevIndex) => prevIndex + 1);
        setInputValue('');
      } else {
        // Word is typed incorrectly, increment error count and keep focus on the same word
        setErrorCount((prevCount) => prevCount + 1);
        setHighlightedWordIndex((prevIndex) => prevIndex + 1);
        setInputValue('');

      }
    }
  };

  const currentParagraph = paragraphs[paragraphIndex];
  const highlightedWord = words[highlightedWordIndex];
  const firstWordStyle = { fontWeight: 'bold' };

  const wordsBeforeHighlighted = words.slice(0, highlightedWordIndex).join(' ');
  const wordsAfterHighlighted = words.slice(highlightedWordIndex + 1).join(' ');

  function handleNextParagraph() {
    // When the user clicks the "Next Paragraph" button, move on to the next paragraph
    setParagraphIndex(paragraphIndex + 1);
    setErrorCount(0);
  }

  return (
    <div>
      <p>
        <span style={firstWordStyle}>{words[0]}</span>
        {' '}
        {wordsBeforeHighlighted}
        {' '}
        <span style={firstWordStyle}>{highlightedWord}</span>
        {' '}
        {wordsAfterHighlighted}
      </p>
      <p>Errors: {errorCount}</p>
      <p>{`Time left: ${timer}s`}</p>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={!isTimerRunning}
        ref={inputRef}
      />
      <button onClick={handleNextParagraph}>Next Paragraph</button>
    </div>
  );

}