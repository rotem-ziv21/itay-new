// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [obstaclePosition, setObstaclePosition] = useState(100);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space' && !isJumping && !gameOver) {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isJumping, gameOver]);

  useEffect(() => {
    if (!gameOver) {
      const obstacleInterval = setInterval(() => {
        setObstaclePosition((prevPosition) => {
          if (prevPosition < -10) {
            setScore((prevScore) => prevScore + 1);
            return 100;
          }
          return prevPosition - 1;
        });
      }, 20);

      const scoreInterval = setInterval(() => {
        setScore((prevScore) => prevScore + 1);
      }, 1000);

      return () => {
        clearInterval(obstacleInterval);
        clearInterval(scoreInterval);
      };
    }
  }, [gameOver]);

  useEffect(() => {
    if (
      obstaclePosition < 10 &&
      obstaclePosition > -10 &&
      playerPosition < 20
    ) {
      setGameOver(true);
    }
  }, [playerPosition, obstaclePosition]);

  const jump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setPlayerPosition(50);
      setTimeout(() => {
        setPlayerPosition(0);
        setIsJumping(false);
      }, 500);
    }
  };

  const restartGame = () => {
    setPlayerPosition(0);
    setObstaclePosition(100);
    setScore(0);
    setGameOver(false);
    setIsJumping(false);
  };

  return (
    <div className="game-container">
      <div className="score">Score: {score}</div>
      <div className="player" style={{ bottom: `${playerPosition}px` }} />
      <div className="obstacle" style={{ left: `${obstaclePosition}%` }} />
      {gameOver && (
        <div className="game-over">
          <div>Game Over!</div>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
      <div className="instructions">Press Space to Jump</div>
    </div>
  );
}

export default App;

// src/App.css
.game-container {
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  background-color: #87CEEB;
}

.player {
  width: 40px;
  height: 40px;
  background-color: #FF6347;
  position: absolute;
  left: 50px;
  bottom: 0;
  border-radius: 50%;
}

.obstacle {
  width: 20px;
  height: 40px;
  background-color: #32CD32;
  position: absolute;
  bottom: 0;
}

.score {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  color: #333;
}

.game-over {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 32px;
}

.game-over button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
}

.instructions {
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 16px;
  color: #333;
}

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

// src/index.css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

// public/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Desktop Runner Game created using React"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Desktop Runner Game</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>

// package.json
{
  "name": "desktop-runner-game",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
