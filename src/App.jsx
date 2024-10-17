import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/Route';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="main-content">
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
