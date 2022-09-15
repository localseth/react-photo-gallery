import React from 'react';
import './App.css';

// API Key
import apiKey from './config';

// app components
import Search from './components/Search';
import Nav from './components/Nav';
import Grid from './components/Grid';

function App() {

  return (
    <div className="container">
      <Search
        apiKey={apiKey}
        // fetchImages={fetchImages}
      />
      <Nav />
      <Grid />
    </div>
  );
}

export default App;
