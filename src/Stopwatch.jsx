import React from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const interValidRef = React.useRef(null);
  const startTimeREf = React.useRef(0);
  React.useEffect(() => {
    if (isRunning) {
      interValidRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeREf.current);
      }, 10);
    }
    return () => {
      clearInterval(interValidRef.current);
    };
  }, [isRunning]);
  function start() {
    setIsRunning(true);
    startTimeREf.current = Date.now() - elapsedTime;
  }
  function stop() {
    setIsRunning(false);
  }
  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }
  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }
  return (
    <div className="stop-watch">
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button className="start-button" onClick={start}>
          Start
        </button>
        <button className="stop-button" onClick={stop}>
          Stop
        </button>
        <button className="reset-button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
