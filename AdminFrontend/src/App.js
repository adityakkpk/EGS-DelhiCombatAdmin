import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ModernHeader from './Components/ModernHeader';
import ModernLogin from './Components/ModernLogin';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ModernLogin />} />
          <Route path="/dashboard" element={<ModernHeader />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
