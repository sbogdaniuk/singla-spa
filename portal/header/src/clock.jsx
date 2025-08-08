import React, { useState, useEffect, useRef } from "react";

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString("en-GB", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export const Clock = () => {
  const [time, setTime] = useState(getCurrentTime());
  const animationFrameId = useRef(0);

  useEffect(() => {
    const update = () => {
      setTime(getCurrentTime());
      animationFrameId.current = requestAnimationFrame(update);
    };

    animationFrameId.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId.current);
  }, []);

  return (
    <div style={{ fontSize: "1.3rem", fontFamily: "monospace" }}>{time}</div>
  );
};
