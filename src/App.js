import "./App.css";
import { useState, useRef } from "react";

const messages = [
  "You are smarter than you think 🧠",
  "You’ve prepared — trust yourself ⭐",
  "One question at a time 💪",
  "I believe in you ❤️",
  "No matter what, I’m proud of you 🍀",
];
const audio = new Audio("/goodluck.mp3");

function App() {
  const [showVideo, setShowVideo] = useState(false);

  const [started, setStarted] = useState(false);
  const [items, setItems] = useState(messages);
  const [currentMessage, setCurrentMessage] = useState("");
  const [finished, setFinished] = useState(false);

  const handleClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    const randomIndex = Math.floor(Math.random() * items.length);
    const msg = items[randomIndex];

    setCurrentMessage(msg);

    const updated = items.filter((_, i) => i !== randomIndex);
    setItems(updated);

    if (updated.length === 0) {
      setTimeout(() => setFinished(true), 1200);
    }
  };

  if (!started) {
    return (
      <div className="screen">
        <h1>🍀 Good luck on your exams Simo</h1>
        <p>I made you this to help you relax</p>
        <button className="start-btn" onClick={() => setStarted(true)}>
          Start 💚
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="screen">
        <h1>✨ You’ve got this ✨</h1>

        <p className="final-text">
          You worked hard. Go do your best. I’m always here 💕
        </p>

        <button className="voice-btn" onClick={() => audio.play()}>
          ▶ Hear this when you need it
        </button>

        <button
          className="again-btn"
          onClick={() => {
            setItems(messages);
            setCurrentMessage("");
            setFinished(false);
          }}
        >
          🔁 Play again when stressed
        </button>
        <div className="video-card">
  {!showVideo ? (
    <button
      className="video-btn"
      onClick={() => setShowVideo(true)}
    >
      🎥 Watch this when you need a reminder
    </button>
  ) : (
    <video
      className="support-video"
      controls
      playsInline
    >
      <source src="/you-are-amazing.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )}
</div>
      </div>
    );
  }
  return (
    <div className="game">
      <p className="counter">Support collected: {5 - items.length} / 5</p>

      <div className="item" onClick={handleClick}>
        🍀
      </div>

      {currentMessage && <div className="message">{currentMessage}</div>}
    </div>
  );
}

export default App;
