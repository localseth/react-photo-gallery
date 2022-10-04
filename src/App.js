import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';

// app components
import Search from './components/Search';
import Nav from './components/Nav';
import ImageLoader from './components/ImageLoader';
import NoRoute from './components/NoRoute';

// import { routes } from './routes.js';

function App() {
  // set default image list. Changing this array will reflect seamlessly in the UI
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
      <Search />
      <Nav defaultList={defaultList} />
        <Routes>
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
