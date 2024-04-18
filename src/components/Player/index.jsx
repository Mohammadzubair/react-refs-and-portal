import { useState, useRef } from "react";

const Player = () => {
  const [playerName, setPlayerName] = useState(null);
  const playerRef = useRef();

  const handleClick = () => {
    setPlayerName(playerRef.current.value);
    playerRef.current.value = "";
  };
  return (
    <div id="player">
      <h2>Welcome {playerName ?? "unknown entity"}</h2>
      <div>
        <input type="text" required ref={playerRef} />
        <button onClick={handleClick}>Set Name</button>
      </div>
    </div>
  );
};

export default Player;
