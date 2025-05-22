import React, { useState } from 'react';

/**
 * GameControls component provides UI for managing the game
 * Includes options for game configuration, restart, and viewing stats
 */
const GameControls = ({ 
  currentPlayer, 
  gameStatus, 
  dimensions, 
  updateGameConfig, 
  restartGame, 
  startNewGame, 
  undoLastMove,
  stats
}) => {
  // Local state for dimension controls
  const [configValues, setConfigValues] = useState({
    boardSize: dimensions.boardSize,
    numLayers: dimensions.numLayers,
    winLength: dimensions.winLength
  });
  
  // Handle input changes for game configuration
  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value, 10);
    
    if (isNaN(numValue) || numValue < 1) return;
    
    // Add limits to values
    const limitedValue = name === 'boardSize' ? Math.min(numValue, 10) : 
                         name === 'numLayers' ? Math.min(numValue, 5) :
                         name === 'winLength' ? Math.min(numValue, configValues.boardSize) : numValue;
    
    setConfigValues({
      ...configValues,
      [name]: limitedValue
    });
  };
  
  // Apply the new configuration
  const applyConfig = () => {
    updateGameConfig(configValues);
    restartGame();
  };
  
  return (
    <div className="game-controls">
      <div className="control-section">
        <h2>Game Controls</h2>
        
        <div className="control-buttons">
          <button 
            className="btn control-btn"
            onClick={restartGame}
          >
            Restart Game
          </button>
          
          <button 
            className="btn control-btn"
            onClick={undoLastMove}
            disabled={gameStatus === 'setup'}
          >
            Undo Move
          </button>
          
          <button 
            className="btn control-btn"
            onClick={startNewGame}
          >
            New Game (Reset Stats)
          </button>
        </div>
      </div>
      
      <div className="control-section">
        <h3>Game Configuration</h3>
        
        <div className="config-group">
          <label>
            Board Size:
            <input 
              type="number" 
              name="boardSize"
              value={configValues.boardSize} 
              onChange={handleConfigChange}
              min={3}
              max={10}
            />
          </label>
          
          <label>
            Number of Layers:
            <input 
              type="number" 
              name="numLayers"
              value={configValues.numLayers} 
              onChange={handleConfigChange}
              min={1}
              max={5}
            />
          </label>
          
          <label>
            Win Length:
            <input 
              type="number" 
              name="winLength"
              value={configValues.winLength} 
              onChange={handleConfigChange}
              min={3}
              max={configValues.boardSize}
            />
          </label>
          
          <button 
            className="btn"
            onClick={applyConfig}
          >
            Apply Changes
          </button>
        </div>
      </div>
      
      <div className="control-section">
        <h3>Game Statistics</h3>
        
        <div className="stats-container">
          <div className="stat-item">
            <span>Player X Wins:</span>
            <span className="stat-value player-X">{stats.playerXWins}</span>
          </div>
          
          <div className="stat-item">
            <span>Player O Wins:</span>
            <span className="stat-value player-O">{stats.playerOWins}</span>
          </div>
          
          <div className="stat-item">
            <span>Draws:</span>
            <span className="stat-value">{stats.draws}</span>
          </div>
          
          <div className="stat-item total">
            <span>Total Games:</span>
            <span className="stat-value">{stats.totalGames}</span>
          </div>
        </div>
      </div>
      
      <div className="control-section">
        <h3>Game Rules</h3>
        <div className="rules-container">
          <p>
            <strong>QuantumTactix</strong> is an advanced version of Tic-Tac-Toe.
          </p>
          <ul>
            <li>Players take turns placing their mark (X or O) on the board</li>
            <li>Win by getting {dimensions.winLength} marks in a row (horizontally, vertically, or diagonally)</li>
            {dimensions.numLayers > 1 && (
              <li>Multiple layers add a new dimension to the game - lines can span across layers!</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GameControls;
