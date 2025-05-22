import React from 'react';

/**
 * GameBoard component renders the multi-dimensional tic-tac-toe board
 * Handles rendering of layers, rows, and cells based on the current game state
 */
const GameBoard = ({ gameState, dimensions, onCellClick, currentPlayer, gameStatus }) => {
  const { boardSize, numLayers } = dimensions;
  
  // Helper function to render a single cell
  const renderCell = (layerIndex, rowIndex, colIndex, cellValue) => {
    const isPlayable = !cellValue && gameStatus === 'active';
    const cellClass = `game-cell ${cellValue ? `player-${cellValue}` : ''} ${isPlayable ? 'playable' : ''}`;
    
    return (
      <div 
        key={`cell-${layerIndex}-${rowIndex}-${colIndex}`}
        className={cellClass}
        onClick={() => isPlayable ? onCellClick(layerIndex, rowIndex, colIndex) : null}
      >
        {cellValue || ''}
        {isPlayable && (
          <div className={`cell-preview player-${currentPlayer}`}>
            {currentPlayer}
          </div>
        )}
      </div>
    );
  };
  
  // Helper function to render a single row
  const renderRow = (layerIndex, rowIndex, row) => (
    <div 
      key={`row-${layerIndex}-${rowIndex}`} 
      className="game-row"
      style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
    >
      {row.map((cellValue, colIndex) => renderCell(layerIndex, rowIndex, colIndex, cellValue))}
    </div>
  );
  
  // Helper function to render a single layer
  const renderLayer = (layerIndex, layer) => (
    <div 
      key={`layer-${layerIndex}`} 
      className={`game-layer ${numLayers > 1 ? 'multi-layer' : ''}`}
    >
      {numLayers > 1 && <div className="layer-indicator">Layer {layerIndex + 1}</div>}
      <div className="game-grid">
        {layer.map((row, rowIndex) => renderRow(layerIndex, rowIndex, row))}
      </div>
    </div>
  );
  
  return (
    <div className="game-board-container">
      <div className={`game-board layers-${numLayers}`}>
        {gameState.map((layer, layerIndex) => renderLayer(layerIndex, layer))}
      </div>
    </div>
  );
};

export default GameBoard;
