# QuantumTactix Game Container

QuantumTactix is an advanced multi-dimensional version of the classic Tic-Tac-Toe game, implemented as a flexible React component. This container provides the core game logic and UI for a strategic gaming experience that extends beyond the traditional 3x3 grid.

## Features

- **Multi-dimensional gameplay**: Supports multiple layers of game boards for 3D play
- **Customizable board size**: Change the size of the grid (e.g., 3x3, 4x4, 5x5, etc.)
- **Adjustable win conditions**: Set the number of marks needed in a row to win
- **Game statistics**: Track wins, draws, and game history
- **Game controls**: Restart, undo moves, and configure game parameters
- **Responsive design**: Works on different screen sizes

## Component Structure

The QuantumTactix game is structured with the following components:

- **Game (index.js)**: Main container component that manages game state and coordinates between components
- **GameBoard.js**: Renders the multi-dimensional game boards and handles cell interactions
- **GameControls.js**: Provides UI for game configuration, statistics, and control actions
- **Game.css**: Styles specific to the game components
- **gameUtils.js**: Utility functions for game state management and win condition checking

## Usage

```jsx
import Game from './components/Game';

function App() {
  return (
    <div className="app">
      {/* Your app layout */}
      <div className="game-container">
        <Game />
      </div>
    </div>
  );
}
```

## Game State Management

The game maintains several key state elements:

1. **Game Configuration**:
   - Board size (default: 3x3)
   - Number of layers (default: 1)
   - Win length (default: 3)

2. **Core Game State**:
   - Current board state (3D array)
   - Current player ('X' or 'O')
   - Game status ('setup', 'active', 'won', 'draw')
   - Move history

3. **Statistics**:
   - Player X wins
   - Player O wins
   - Draws
   - Total games played

## Customization

You can modify the appearance of the game by adjusting the CSS variables in `Game.css` and `App.css`. The main game colors, sizes, and spacing are defined as variables for easy customization.

## Future Enhancements

The current implementation provides a foundation that can be extended with additional features:

- AI opponents with varying difficulty levels
- Online multiplayer capabilities
- Enhanced animation effects
- Additional game modes with special rules
- Sound effects and music
- Player profiles and persistent statistics
