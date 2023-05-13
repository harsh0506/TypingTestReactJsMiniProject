import React, { useState, useEffect, useRef } from "react";

export default function app() {
  const paragraphOptions = [{ name: "Paragraph 1", text: "The quick brown fox jumps over the lazy dog", }, { name: "Paragraph 2", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", }, { name: "Paragraph 3", text: "It was a dark and stormy night; the rain fell in torrents", }, { name: "Paragraph 4", text: "All happy families are alike; each unhappy family is unhappy in its own way", }, { name: "Paragraph 5", text: "In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.", },];

  const [selectedParagraphIndex, setSelectedParagraphIndex] = useState(0);
  const [originalParagraph, setOriginalParagraph] = useState(
    paragraphOptions[selectedParagraphIndex].text
  );
  const [currentWord, setCurrentWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [resetCounter, setResetCounter] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      const timerId = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeRemaining === 0) {
      setIsTimerRunning(false);
      clearInterval();
      setTypingSpeed(
        Math.round(
          (originalParagraph.split(" ").length / (30 - timeRemaining)) * 60
        )
      );
    }
  }, [isTimerRunning, timeRemaining]);

  useEffect(() => {
    setOriginalParagraph(paragraphOptions[selectedParagraphIndex].text);
    handleReset();
  }, [selectedParagraphIndex]);

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
    }
    else if (!isTimerRunning) {
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

  const handleParagraphChange = (event) => {
    setSelectedParagraphIndex(parseInt(event.target.value));
    handleReset();

  };
  return (
    <div>
      <div>
        <select value={selectedParagraphIndex} onChange={handleParagraphChange}>
          {paragraphOptions.map((paragraph, index) => (
            <option key={index} value={index}>
              {paragraph.name}
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
        {timeRemaining === 0 || wordIndex === originalParagraph.length ? (
          <>
            <p>Speed: {Math.round(typingSpeed)} words per minute</p>
            <button onClick={handleReset}>Reset</button>
          </>
        ) : (
          <button onClick={handleTimerStart} disabled={isTimerRunning}>
            Start Typing Test
          </button>
        )}
        <p>Error Count: {errorCount}</p>
      </div>
    </div>
  );
}