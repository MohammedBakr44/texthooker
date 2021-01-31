import "preact/debug";
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import Settings from "./components/settings";
const App = () => {
  if (typeof window != "undefined") {
    const [charCount, setCharCount] = useState(0);
    const [lineCount, setLineCount] = useState(0);
    const [data, setData] = useState([]);
    const [open, toggle] = useState(false);
    localStorage.text = JSON.stringify({ lines: [] });
    let lines = JSON.parse(localStorage.text).lines;
    useEffect(() => {
      const container = document.querySelector(".container");
      const config = { childList: true, attributes: false };
      console.log("useEffect initiated!!!");
      loadLines(container);
      const callback = (mutations) => {
        for (const mutation of mutations) {
          let _lines = lineCount;
          console.log(lines);
          let text =
            mutation.addedNodes[_lines ? _lines - 1 : _lines].innerText;
          lines.push(text);
          updateData(text);
          console.log(lines);
          localStorage.setItem("lines", lines);
          console.log(JSON.parse(localStorage.text).lines);
          console.log(sessionStorage.text);
          console.log(mutation);
          console.log(text);
          setLineCount((count) => count + 1);
          console.log(lineCount);
          setCharCount((count) => count + text.length);
          console.log(text);
          scroll();
        }
      };
      const observer = new MutationObserver(callback);
      observer.observe(container, config);
    }, []);

    const removeLine = () => {
      console.log(lineCount);
      let lastP = Array.from(document.querySelectorAll(".container p")).pop();
      console.log(lineCount ? lineCount - 1 : lineCount);
      console.log(lastP);
      lastP.remove();
      const linesData = localStorage.getItem("lines").split(",");
      localStorage.setItem("lines", removeLastElementArray(linesData));
      setData((data) => removeLastElementArray(data));
      setCharCount((count) => count - lastP.innerText.length);
      setLineCount((count) => count - 1);
    };

    const removeLastElementArray = (arr) => {
      arr.pop();
      return arr;
    };
    // workaround if the localStorage is empty
    const loadLines = (container) => {
      let linesData = localStorage.getItem("lines");
      if (linesData != null) {
        linesData = localStorage.getItem("lines").split(",");
        setData(linesData);
        console.log(linesData);
        for (const i of linesData) {
          const line = document.createElement("p");
          let t = document.createTextNode(`${i}`);
          setLineCount((line) => line + 1);
          setCharCount((chars) => chars + i.length);
          console.log(i);
          line.appendChild(t);
          container.appendChild(line);
        }
      } else {
        return;
      }
    };

    const updateData = (text) => {
      setData((data) => [...data, text]);
    };
    const clearLocalStorage = () => {
      localStorage.setItem("lines", []);
      setData([]);
    };

    const scroll = () => {
      // Copied that from another code, it does the job so no need to change it.

      const LEEWAY = 200; // Amount of "leeway" pixels before latching onto the bottom.

      // Some obscene browser shit because making sense is for dweebs
      let b = document.body;
      let offset = b.scrollHeight - b.offsetHeight;
      let scrollPos = b.scrollTop + offset;
      let scrollBottom = b.scrollHeight - (b.clientHeight + offset);

      // iF WE ARE AT The bottom, go to the bottom again.
      if (scrollPos >= scrollBottom - LEEWAY) {
        window.scrollTo(0, document.body.scrollHeight);
      }
    };

    return (
      <div className="app">
        <div className="remove">
          <span className="chars" onClick={removeLine}>
            {charCount.toLocaleString()} / {lineCount.toLocalString()}
          </span>
          <span className="button">x</span>
        </div>
        <div className="settingsToggle" onClick={() => toggle((t) => !t)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="container"></div>
        <Settings clear={clearLocalStorage} isOpen={open} />
      </div>
    );
  }
};

export default App;
