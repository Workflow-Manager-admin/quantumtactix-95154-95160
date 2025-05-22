/**
 * Game utility functions for QuantumTactix
 */

/**
 * Initialize a new game state with the specified dimensions
 * 
 * @param {number} boardSize - Size of the grid (e.g., 3 for 3x3)
 * @param {number} numLayers - Number of 3D layers
 * @returns {Array} - Multi-dimensional array representing the game state
 */
export const initializeGameState = (boardSize, numLayers) => {
  // Create an empty 3D array structure
  const gameState = [];
  
  for (let layer = 0; layer < numLayers; layer++) {
    const layerBoard = [];
    
    for (let row = 0; row < boardSize; row++) {
      const boardRow = Array(boardSize).fill(null);
      layerBoard.push(boardRow);
    }
    
    gameState.push(layerBoard);
  }
  
  return gameState;
};

/**
 * Create a deep copy of the current game state
 * 
 * @param {Array} gameState - Current game state
 * @returns {Array} - Deep copy of the game state
 */
export const cloneGameState = (gameState) => {
  return JSON.parse(JSON.stringify(gameState));
};

/**
 * Make a move on the game board
 * 
 * @param {Array} gameState - Current game state
 * @param {number} layerIndex - Layer index
 * @param {number} rowIndex - Row index
 * @param {number} colIndex - Column index
 * @param {string} player - Current player ('X' or 'O')
 * @returns {Array} - New game state after the move
 */
export const makeMove = (gameState, layerIndex, rowIndex, colIndex, player) => {
  // Create a deep copy of the current state
  const newState = cloneGameState(gameState);
  
  // Place the player's mark
  newState[layerIndex][rowIndex][colIndex] = player;
  
  return newState;
};

/**
 * Check if the current move results in a win or draw
 * 
 * @param {Array} gameState - Current game state
 * @param {number} layerIndex - Layer of the last move
 * @param {number} rowIndex - Row of the last move
 * @param {number} colIndex - Column of the last move
 * @param {string} player - Player who made the last move ('X' or 'O')
 * @param {number} winLength - Number of marks in a row needed to win
 * @returns {Object} - Result with hasWon and isDraw flags
 */
export const checkWinCondition = (gameState, layerIndex, rowIndex, colIndex, player, winLength) => {
  const boardSize = gameState[0].length;
  const numLayers = gameState.length;
  
  // Helper to check if coordinates are valid
  const isValidPosition = (l, r, c) => {
    return l >= 0 && l < numLayers && 
           r >= 0 && r < boardSize && 
           c >= 0 && c < boardSize;
  };
  
  // Check if we have a winner
  const directions = [
    // Horizontal
    { dl: 0, dr: 0, dc: 1 },
    // Vertical
    { dl: 0, dr: 1, dc: 0 },
    // Diagonal \
    { dl: 0, dr: 1, dc: 1 },
    // Diagonal /
    { dl: 0, dr: 1, dc: -1 }
  ];
  
  // Add 3D directions if we have multiple layers
  if (numLayers > 1) {
    // Layer-traversing directions
    directions.push(
      // Layer-only
      { dl: 1, dr: 0, dc: 0 },
      // 3D diagonals (4 types)
      { dl: 1, dr: 1, dc: 0 },
      { dl: 1, dr: 0, dc: 1 },
      { dl: 1, dr: 1, dc: 1 },
      { dl: 1, dr: 1, dc: -1 }
    );
  }
  
  // Check each direction for a win
  for (const dir of directions) {
    const { dl, dr, dc } = dir;
    
    // Count in both the positive and negative directions
    let count = 1; // Include the current position
    
    // Check in the positive direction
    for (let i = 1; i < winLength; i++) {
      const l = layerIndex + (dl * i);
      const r = rowIndex + (dr * i);
      const c = colIndex + (dc * i);
      
      if (isValidPosition(l, r, c) && gameState[l][r][c] === player) {
        count++;
      } else {
        break;
      }
    }
    
    // Check in the negative direction
    for (let i = 1; i < winLength; i++) {
      const l = layerIndex - (dl * i);
      const r = rowIndex - (dr * i);
      const c = colIndex - (dc * i);
      
      if (isValidPosition(l, r, c) && gameState[l][r][c] === player) {
        count++;
      } else {
        break;
      }
    }
    
    // Check if we have a winner
    if (count >= winLength) {
      return { hasWon: true, isDraw: false };
    }
  }
  
  // Check for a draw (all cells filled)
  let isDraw = true;
  for (let l = 0; l < numLayers; l++) {
    for (let r = 0; r < boardSize; r++) {
      for (let c = 0; c < boardSize; c++) {
        if (gameState[l][r][c] === null) {
          isDraw = false;
          break;
        }
      }
      if (!isDraw) break;
    }
    if (!isDraw) break;
  }
  
  return { hasWon: false, isDraw };
};
