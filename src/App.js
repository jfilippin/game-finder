import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Main from './components/main.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Main/> }/>
      </Routes>
    </Router>
  );
}

export default App;
