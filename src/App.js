import React from 'react';
import './App.css';

// API Key
import apiKey from './config';

// app components
import Search from './components/Search';
import Nav from './components/Nav';
import Grid from './components/Grid';

// include axios
const axios = require('axios');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      imageResults: []
    };
  }

  updateImageState = (data) => {
    this.setState({
      imageResults: data
    })
  }

  imageSearch = (tag) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&tags=${tag}&per_page=24&api_key=${apiKey}&format=json&nojsoncallback=1`)
    .then(response => {
      // handle success
      this.updateImageState(response.data.photos.photo)
      console.log(this.state.imageResults)
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

  componentDidMount() {
    this.imageSearch('cats and dogs');
  }

  render() {
    return (
      <div className="container">
        <Search
          images={this.state.imageResults}
          apiKey={apiKey}
          imageSearch={this.imageSearch}
          // fetchImages={fetchImages}
        />
        <Nav imageSearch={this.imageSearch} />
        <Grid images={this.state.imageResults} />
      </div>
    );
  }
}

export default App;
