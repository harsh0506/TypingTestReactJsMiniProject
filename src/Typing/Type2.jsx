import React, { useState, useEffect, useRef } from "react";


const paragraphs = [
  "The quick brown fox jumps over the lazy dog",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "It was a dark and stormy night; the rain fell in torrents, except at occasional intervals, when it was checked by a violent gust of wind which swept up the streets (for it is in London that our scene lies), rattling along the housetops, and fiercely agitating the scanty flame of the lamps that struggled against the darkness.",
  "In the beginning God created the heavens and the earth.",
  "One Hundred Years of Solitude tells the story of the Buendía family, whose patriarch, José Arcadio Buendía, founds the town of Macondo, the metaphoric Colombia."
];

export default function app() {
  const [originalParagraph, setOriginalParagraph] = useState(paragraphs[0]);
  const [currentWord, setCurrentWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [resetCounter, setResetCounter] = useState(0);
  const inputRef = useRef(null);

  let timerId = null;

  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      timerId = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsTimerRunning(false);
      clearInterval(timerId);
      const wordsTyped = originalParagraph.split(" ").slice(0, wordIndex);
      const timeElapsed = 30 - timeRemaining;
      setTypingSpeed(Math.round((wordsTyped.length / timeElapsed) * 60));
    }
    return () => clearInterval(timerId);
  }, [isTimerRunning, timeRemaining]);

  const handleParagraphChange = (event) => {
    setOriginalParagraph(event.target.value);
    handleReset();
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setCurrentWord(value);
    if (value.endsWith(" ")) {
      const currentTypedWord = value.trim();
      const expectedWord = originalParagraph.split(" ")[wordIndex];
      if (currentTypedWord !== expectedWord) {
        setErrorCount((count) => count + 1);
      }
      setWordIndex((index) => index + 1);
      setCurrentWord("");
      if (wordIndex === originalParagraph.split(" ").length - 1) {
        setIsTimerRunning(false);
        clearInterval(timerId);
        setTypingSpeed(
          Math.round(
            (originalParagraph.split(" ").length / (30 - timeRemaining)) * 60
          )
        );
      }
    } else if (!isTimerRunning) {
      handleTimerStart();
    }
  };

  const handleReset = () => {
    setIsTimerRunning(false);
    setTimeRemaining(30);
    setWordIndex(0);
    setErrorCount(0);
    setTypingSpeed(0);
    setCurrentWord("");
    setResetCounter((count) => count + 1);
    inputRef.current.focus();
  };

  const handleTimerStart = () => {
    setIsTimerRunning(true);
    inputRef.current.focus();
  };

  return (
    <div>
      <div>
        <select onChange={handleParagraphChange}>
          {paragraphs.map((paragraph, index) => (
            <option key={index} value={paragraph}>
              {paragraph}
            </option>
          ))}
        </select>
        <p>
          {originalParagraph.split(" ").map((word, index) => {
            const isCurrentWord = index === wordIndex;
            const wordStyle = isCurrentWord ? { fontWeight: "bold" } : {};
            return <span style={wordStyle} key={index}>{word} </span>;
          })}
        </p>
        <input
          type="text"
          value={currentWord}
          onChange={handleInputChange}
          disabled={!isTimerRunning || timeRemaining === 0}
          ref={inputRef}
        />
      </div>
      <div>
        <p>Time remaining: {timeRemaining}</p>
        {timeRemaining === 0 ? (
          <>
            <p>Speed: {typingSpeed} words per minute</p>
            <button onClick={handleReset}>Reset</button>
          </>
        ) : (
          <button onClick={handleTimerStart} disabled={isTimerRunning}>
            Start Typing Test
          </button>
        )}
        <p>Error Count: {errorCount}</p>
        <p>Speed: {typingSpeed} words per minute</p>

      </div>
    </div>
  );
};