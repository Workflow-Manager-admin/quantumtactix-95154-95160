import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import { initializeGameState, checkWinCondition, makeMove } from '../../utils/gameUtils';
import './Game.css';

/**
 * Main container component for QuantumTactix
 * This component handles the game state and coordinates between the board and controls
 */
const Game = () => {
  // Game configuration state
  const [dimensions, setDimensions] = useState({
    boardSize: 3, // Default 3x3 grid
    numLayers: 1,  // Default single layer (can be increased for multi-dimensional play)
    winLength: 3   // Default win condition (3 in a row)
  });

  // Core game state
  const [gameState, setGameState] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameStatus, setGameStatus] = useState('setup'); // setup, active, won, draw
  const [winner, setWinner] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);
  
  // Game statistics
  const [stats, setStats] = useState({
    playerXWins: 0,
    playerOWins: 0,
    draws: 0,
    totalGames: 0
  });

  // Initialize or reset the game
  const initializeGame = useCallback(() => {
    const newGameState = initializeGameState(
      dimensions.boardSize, 
      dimensions.numLayers
    );
    
    setGameState(newGameState);
    setCurrentPlayer('X');
    setGameStatus('active');
    setWinner(null);
    setMoveHistory([]);
  }, [dimensions]);

  // Effect to initialize the game
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Handle player moves
  const handleCellClick = (layerIndex, rowIndex, colIndex) => {
    // Ignore clicks if game isn't active
    if (gameStatus !== 'active' || !gameState) return;
    
    // Check if the cell is already occupied
    if (gameState[layerIndex][rowIndex][colIndex]) return;
    
    // Update game state with the new move
    const newGameState = makeMove(
      gameState, 
      layerIndex, 
      rowIndex, 
      colIndex, 
      currentPlayer
    );
    
    // Record the move in history
    const move = {
      player: currentPlayer,
      position: { layer: layerIndex, row: rowIndex, col: colIndex }
    };
    
    const newHistory = [...moveHistory, move];
    
    // Update state
    setGameState(newGameState);
    setMoveHistory(newHistory);
    
    // Check for win condition
    const winResult = checkWinCondition(
      newGameState, 
      layerIndex, 
      rowIndex, 
      colIndex, 
      currentPlayer,
      dimensions.winLength
    );
    
    if (winResult.hasWon) {
      setGameStatus('won');
      setWinner(currentPlayer);
      setStats(prevStats => ({
        ...prevStats,
        [`player${currentPlayer}Wins`]: prevStats[`player${currentPlayer}Wins`] + 1,
        totalGames: prevStats.totalGames + 1
      }));
    } else if (winResult.isDraw) {
      setGameStatus('draw');
      setStats(prevStats => ({
        ...prevStats,
        draws: prevStats.draws + 1,
        totalGames: prevStats.totalGames + 1
      }));
    } else {
      // Switch players
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  // Update game configuration
  const updateGameConfig = (newConfig) => {
    setDimensions({
      ...dimensions,
      ...newConfig
    });
  };

  // Restart the current game
  const restartGame = () => {
    initializeGame();
  };

  // Start a new game (resets statistics)
  const startNewGame = () => {
    initializeGame();
    setStats({
      playerXWins: 0,
      playerOWins: 0,
      draws: 0,
      totalGames: 0
    });
  };

  // Undo the last move
  const undoLastMove = () => {
    if (moveHistory.length === 0) return;
    
    // Remove the last move from history
    const newHistory = moveHistory.slice(0, -1);
    
    // Reconstruct the game state from the new history
    const newGameState = initializeGameState(
      dimensions.boardSize, 
      dimensions.numLayers
    );
    
    newHistory.forEach(move => {
      const { player, position } = move;
      newGameState[position.layer][position.row][position.col] = player;
    });
    
    // Update state
    setGameState(newGameState);
    setMoveHistory(newHistory);
    setCurrentPlayer(moveHistory[moveHistory.length - 1]?.player === 'X' ? 'O' : 'X');
    setGameStatus('active');
    setWinner(null);
  };

  return (
    <div className="quantum-tactix-game">
      <div className="game-header">
        <h1>QuantumTactix</h1>
        <div className="game-status">
          {gameStatus === 'active' && (
            <p>Current Player: <span className={`player-${currentPlayer}`}>{currentPlayer}</span></p>
          )}
          {gameStatus === 'won' && (
            <p>Player <span className={`player-${winner}`}>{winner}</span> Wins!</p>
          )}
          {gameStatus === 'draw' && (
            <p>Game ended in a draw!</p>
          )}
        </div>
      </div>
      
      {gameState && (
        <div className="game-content">
          <GameBoard 
            gameState={gameState} 
            dimensions={dimensions}
            onCellClick={handleCellClick}
            currentPlayer={currentPlayer}
            gameStatus={gameStatus}
          />
          
          <GameControls 
            currentPlayer={currentPlayer}
            gameStatus={gameStatus}
            dimensions={dimensions}
            updateGameConfig={updateGameConfig}
            restartGame={restartGame}
            startNewGame={startNewGame}
            undoLastMove={undoLastMove}
            stats={stats}
          />
        </div>
      )}
    </div>
  );
};

export default Game;
