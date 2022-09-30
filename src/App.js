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
import Search from './components/Search';
import Nav from './components/Nav';
import Grid from './components/Grid';

// include axios
const axios = require('axios');


function App() {
  const [imageResults, setImageResults] = useState([]);

  // Requests images form flickr api and updates state with new array of image data
  const imageSearch = (tag) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&tags=${tag}&per_page=24&api_key=${apiKey}&format=json&nojsoncallback=1`)
    .then(response => {
      // handle success
      setImageResults(response.data.photos.photo)
      console.log(imageResults)
    })
    .catch(function (error) {
      // handle error
      console.log('There was an error fetching data', error);
    })
    .then(function () {
      // always executed
      console.log('no errors were encountered')
    });
  }

  useEffect(() => imageSearch('cats and dogs'), []);

  return (
    <BrowserRouter basename="/react-image-search">
      <div className="container">
        <Search
            images={imageResults}
            apiKey={apiKey}
            imageSearch={imageSearch}
        />
        <Nav imageSearch={imageSearch} />
        <Routes> 
          <Grid images={imageResults} />
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
