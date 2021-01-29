import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

const App = () => {
  const [charCount, setCharCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    const container = document.querySelector(".container");
    const config = { childList: true, attributes: false };
    const callback = (mutations) => {
      for (const mutation of mutations) {
        let text =
          mutation.addedNodes[lineCount ? lineCount - 1 : lineCount].innerText;
        console.log(mutation);
        console.log(text);
        setLineCount((count) => count + 1);
        console.log(lineCount);
        setCharCount((count) => count + text.length);
        text = "";
        console.log(text);
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(container, config);
  }, []);

  const removeLine = () => {
    console.log(lineCount);
    let lastP = document.querySelectorAll(".container p")[
      lineCount ? lineCount - 1 : lineCount
    ];
    lastP.remove();
    setCharCount((count) => count - lastP.innerText.length);
    setLineCount((count) => count - 1);
  };
  return (
    <div className="app">
      <div className="remove">
        <span className="chars" onClick={removeLine}>
          {charCount} / {lineCount}
        </span>
        <span className="button">x</span>
      </div>
      <div className="container"></div>
    </div>
  );
};

export default App;
