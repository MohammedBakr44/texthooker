import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

const App = () => {
  const [charCount, setCharCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const container = document.querySelector(".container");
  const config = { childList: true, attributes: false };
  const callback = (mutations) => {
    for (const mutation of mutations) {
      console.log(mutation);
    }
  };
  const observer = new MutationObserver(callback);
  const runObserver = () => {
    observer.observe(container, config);
  };

  useEffect(() => runObserver, []);

  const removeLine = () => {
    console.log(lineCount);
    document.querySelectorAll(".container p")[ptags - 1].remove();
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
