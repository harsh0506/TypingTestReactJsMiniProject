import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
   
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

  const location = useLocation();

  let timerId = null
  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      timerId = setInterval(() => {
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
    <section style={{ width: "100vw", height: "98vh" }} className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="border-b border-gray-900/10 pb-12">


        <div className="border-b border-gray-900/10 pb-12">
          <div className="sm:col-span-3">
            <p style={{ fontSize: 35, color: "black" }}>Hello {location.state.name} , This is Typing Test</p>

            <div className="mt-2">
              <select
              style={{marginBottom:20 , marginTop:20}}
                value={selectedParagraphIndex} onChange={handleParagraphChange}
                className="block w-full rounded-md border-0 py-1.5 text-black-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >

                {paragraphOptions.map((paragraph, index) => (
                  <option key={index} value={index}>
                    {paragraph.name}
                  </option>
                ))}
              </select>
              <div style={{ display: "flex", height: 100, flexDirection:"column", gap: 50, alignItems: "center", justifyContent: "center" }}>
                <div style={{ display: "flex", height: 100, gap: 50, alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontSize: 35, color: "black" }}>Error Count: {errorCount}</p>
                  <p style={{ fontSize: 35, color: "black" }}>Speed: {Math.round(typingSpeed)} WPM</p>
                  <p style={{ fontSize: 35, color: "black" }}>Time remaining: {timeRemaining} Sec</p>
                </div>
                {timeRemaining === 0 || wordIndex === originalParagraph.length ? (
                  <>
                    <button
                      className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-center font-medium text-white hover:bg-indigo-700"
                      onClick={handleReset}>Reset</button>
                  </>
                ) : (
                  <button
                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-center font-medium text-white hover:bg-indigo-700"
                    onClick={handleTimerStart} disabled={isTimerRunning}>
                    Start Typing Test
                  </button>
                )}



              </div>
            </div>
          </div>
        </div>

        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>
              {originalParagraph.split(" ").map((word, index) => {
                const isCurrentWord = index === wordIndex;
                const wordStyle = isCurrentWord ? { fontWeight: "bold" } : {};
                return <span style={wordStyle} key={index}>{word} </span>;
              })}
            </p>
          </blockquote>
        </figure>
      </div>

      <div className="mt-2">
        <input
          className="bg-indigo-600 text-white"
          style={{ padding: 10, textAlign: "center", borderRadius: 20, fontSize: 30, height: 50 }}
          type="text"
          value={currentWord}
          onChange={handleInputChange}
          disabled={!isTimerRunning || timeRemaining === 0}
          ref={inputRef}
        />

      </div>
    </section>
  );
}