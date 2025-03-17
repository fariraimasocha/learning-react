import React from "react";
import { useState } from "react";

export default function Interview() {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>{count}</p>
      <button onClick={handleCount}>Count</button>
    </div>
  );
}
