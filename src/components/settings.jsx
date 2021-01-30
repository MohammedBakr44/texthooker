import "preact/debug";
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

const Settings = (props) => {
  const [bg, setBg] = useState("");
  const [colour, setColour] = useState("");
  const [font, fontSize] = useState(30);
  useEffect(() => {
    let localBg = localStorage.getItem("bg");
    let localColour = localStorage.getItem("colour");
    let localFont = localStorage.getItem("fontSize");
    setBg(localBg);
    setColour(localColour);
    document.body.style.backgroundColor = `${localBg}`;
    document.body.style.color = `${localColour}`;
    document.querySelector(".container").style.fontSize = `${localFont}px`;
  }, []);

  const handleBg = (e) => {
    setBg(e.target.value);
  };
  const handleColour = (e) => {
    setColour(e.target.value);
  };

  const handleFontSize = (e) => {
    fontSize(+e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    document.body.style.backgroundColor = `${bg}`;
    document.body.style.color = `${colour}`;
    document.querySelector(".container").style.fontSize = `${font}px`;
    localStorage.setItem("bg", bg);
    localStorage.setItem("colour", colour);
    localStorage.setItem("fontSize", fontSize);
  };
  return (
    <div className={`settings ${props.isOpen ? "open" : "close"}`}>
      <form>
        <label>Set background colour</label>
        <input
          name="backgroundColor"
          type="text"
          value={bg}
          onChange={(e) => handleBg(e)}
        />
        <label>Set font size</label>
        <input
          name="fontSize"
          type="text"
          value={font}
          onChange={(e) => handleFontSize(e)}
        />
        <label>Set font colour</label>
        <input
          name="color"
          type="text"
          value={colour}
          onChange={(e) => handleColour(e)}
        />
        <button onClick={handleSubmit}>Apply</button>
      </form>
      <h4>
        <b>
          Clear localStorage, remove current lines so they don't show up aftre
          reloading
        </b>
      </h4>
      <button onClick={() => props.clear()}>Clear</button>
    </div>
  );
};

export default Settings;
