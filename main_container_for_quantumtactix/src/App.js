import React from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> QuantumTactix
            </div>
            <div className="tagline">Multi-dimensional Tic-Tac-Toe</div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="game-container">
            <Game />
          </div>
        </div>
      </main>
      
      <footer>
        <div className="container">
          <div className="footer-content">
            <p>QuantumTactix &copy; {new Date().getFullYear()} - Powered by KAVIA AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;