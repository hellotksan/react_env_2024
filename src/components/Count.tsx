// TextInput.js
import { useState } from "react";

const TextInput = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter some text"
        aria-label="Text Input"
      />
      <p>Entered Text: {text}</p>
    </div>
  );
};

export default TextInput;
