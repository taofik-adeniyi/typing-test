// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Nav from "./comps/Nav";
import Display from "./comps/Display";
import { words } from "./utils";
import Duration from "./comps/Duration";
import Word from "./comps/Word";
import Timer from "./comps/Timer";
import Editable from "./comps/Editable";

const getWords = () =>
  `Fusce fermentum scelerisque maximus. Mauris feugiat est ac odio accumsan, at rutrum libero elementum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget porttitor ante, nec eleifend sapien. Nulla dictum leo eu leo volutpat, non molestie ex vulputate. Nulla eleifend sodales nulla vitae bibendum. Ut placerat elit vitae sem facilisis, nec tristique neque cursus. Phasellus enim metus, ultricies id elit sit amet, tristique volutpat libero. Quisque hendrerit lobortis orci id imperdiet`.split(
    " "
  );
// .sort(() => (Math.random() > 0.5 ? 1 : -1));
function App() {
  const generateRandomWords = (args: number) => {
    const index = Math.floor(Math.random() * args);
    return words[index];
  };
  const [testWords, setTestWords] = useState(
    `Fusce fermentum scelerisque maximus`
  );
  const [words, setWords] = useState(
    `Fusce fermentum scelerisque maximus. Mauris feugiat est ac odio accumsan`
  );

  const [startCounting, setStartCounting] = useState(false);
  const [speed, setSpeed] = useState(0);

  const [paragraph, setParagraphStyle] = useState(() => generateRandomWords(5));
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(selectedDuration);

  const [durations, setDurations] = useState([1, 2, 5]);
  const wee = generateRandomWords(5);

  const handleParagraph = (args: string) => {
    setParagraphStyle(args);
  };
  const handleDuration = (args: number) => {
    setSelectedDuration(args);
  };
  const [correctWordArray, setCorrectWordArray] = useState([]);

  const handleWordsChange = (args: string) => {};
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [wordInput, setWordInput] = useState("");
  const handleValue = (args: string) => {
    // if(correctWordArray.length === words.split(" ").length){
    //   alert('ended')
    // }
    // if (activeWordIndex === words.split("").length) {
    //   return;
    //   // stop
    // }

    if (activeWordIndex === words.split(" ").length) {
      // stop
    }

    if (!startCounting) {
      setStartCounting(true);
    }

    if (args.endsWith(" ")) {
      // the user has finished with a word

      if (activeWordIndex === words.split(" ").length - 1) {
        setStartCounting(false);
        // setWordInput("");
        setWordInput("Challenge Completed!");
      } else {
        setWordInput("");
      }

      setActiveWordIndex((prev) => prev + 1);

      setCorrectWordArray((prev) => {
        const word = args.trim();

        const result = [...prev];

        result[activeWordIndex] = word === words.split(" ")?.[activeWordIndex];

        return result;
      });
    } else {
      setWordInput(args);
    }
  };
  const handleTimeElapsed = () => {
    setTimeElapsed((oldTimeElapsed) => oldTimeElapsed + 1);
  };

  const [isEditing, setEditing] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("e", e);
  };
  const [countdown, setCountdown] = useState(59);

  useEffect(() => {
    setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  }, []);


  
  return (
    <div className="app">
      <Nav
        score={correctWordArray.filter((item) => item).length}
        activeWordIndex={activeWordIndex}
        correctWordArray={correctWordArray}
        words={words}
      />
      <div>
        <Timer
          startCounting={startCounting}
          speed={selectedDuration}
          time={selectedDuration}
          timeElapsed={timeElapsed}
          handleTimeElapsed={handleTimeElapsed}
          correctWords={correctWordArray.filter((item) => item)?.length}
          handleDuration={handleDuration}
          durations={durations}
          selectedDuration={selectedDuration}
        />
      </div>

      <Editable
        isEditing={isEditing}
        setEditing={setEditing}
        value={words}
        setWords={setWords}
        onChange={(e) => setWords(e.target.value)}
        onSubmit={onSubmit}
      >
        <span style={{ maxWidth: "100%" }}>
          {words.split(" ").map((word, idx) => {
            return (
              <Word
                key={idx}
                text={word}
                active={idx === activeWordIndex}
                correct={correctWordArray[idx]}
              />
            );
          })}
        </span>
      </Editable>

      <Display
        paragraph={paragraph}
        onChange={handleWordsChange}
        handleParagraph={handleParagraph}
        wordInput={wordInput}
        handleValue={handleValue}
      />
    </div>
  );
}

export default App;
