import React, { useState } from "react";

const Post = () => {
  const [clickCount, setClickCount] = useState(0);

  const handleButtonClick = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <div>
      <h2>Click Count: {clickCount}</h2>
      <button onClick={handleButtonClick}>Click me</button>
    </div>
  );
};

export default Post;
