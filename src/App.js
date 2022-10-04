import React, { useState, useEffect } from 'react';
import { ReactDOM } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';

// API Key
import apiKey from './config';

// app components
import Search2 from './components/Search2';
import Nav from './components/Nav';
import Grid from './components/Grid';
import ImageLoader from './components/ImageLoader';
import NoRoute from './components/NoRoute';

// import { routes } from './routes.js';

// include axios
const axios = require('axios');

function App() {

  const defaultList = ["axolotyl", "capybara", "dinosaur"];

  const getRandomDefault = () => {
    let result = defaultList[Math.floor(Math.random() * defaultList.length)];
    console.log(result);
    return(
      result
    )
  }

  return (
    <BrowserRouter>
      <div className="container">
      <Search2 />
      <Nav defaultList={defaultList} />
        <Routes>
        {/* <ImageLoader tag="cats and dogs" /> */}
          {/* <Search
              images={imageResults}
              apiKey={apiKey}
              imageSearch={imageSearch}
          /> */}
            <Route path="/search/:query" element={<ImageLoader tag="" />} />
            <Route path="/" element={<ImageLoader
              defaultList={defaultList}
              tag={getRandomDefault()}
              />}
            />
            <Route path="/:tag" element={<ImageLoader tag={defaultList[0]} defaultList={defaultList} />} />
            <Route path="*" element={<NoRoute />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

// OLD CODE WITH CLASSES --- NEW CODE USING HOOKS ABOVE
// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       imageResults: []
//     };
//   }

//   updateImageState = (data) => {
//     this.setState({
//       imageResults: data
//     })
//   }

//   componentDidMount() {
//     this.imageSearch('cats and dogs');
//   }

//   render() {
//     return (
//       <div className="container">
//         <Search
//           images={this.state.imageResults}
//           apiKey={apiKey}
//           imageSearch={this.imageSearch}
//           // fetchImages={fetchImages}
//         />
//         <Nav imageSearch={this.imageSearch} />
//         <Grid images={this.state.imageResults} />
//       </div>
//     );
//   }
// }

export default App;
