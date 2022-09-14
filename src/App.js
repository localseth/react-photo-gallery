import React from 'react';
import './App.css';

// app components
import Search from './components/Search';
import Nav from './components/Nav';

function App() {
  return (
    <div className="container">
      <Search />
      <Nav />
    </div>
  );
}

export default App;
