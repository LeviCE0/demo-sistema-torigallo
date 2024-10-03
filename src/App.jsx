import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/Route';
import { AuthProvider } from './components/AuthContext.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <div className="main-content">
            <AppRoutes />
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
