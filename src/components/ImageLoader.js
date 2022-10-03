import React, {
    useState,
    useEffect
} from 'react';
import { ReactDOM } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  useParams
} from 'react-router-dom';
import '../App.css';

// Import Components
import Grid from './Grid';
import NoResults from './NoResults';

// API Key
import apiKey from '../config';

// include axios
const axios = require('axios');

// Load image search and default images
const ImageLoader = (props) => {
    // Set state for image results and default image sets
    const [imageResults, setImageResults] = useState([]);
    const [default1, setDefault1] = useState([]);
    const [default2, setDefault2] = useState([]);
    const [default3, setDefault3] = useState([]);

    // Set state for page title
    const [title, setTitle] = useState("Flickr Image Search");
    useEffect(() => {
        document.title = title;
    }, [title]);

    const defaultList = props.defaultList;

    let { query } = useParams();

    let { tag } = useParams()
    // if (tag.toLowerCase() === "search") {
    //     tag = null;
    // }


  // Requests images form flickr api and updates state with new array of image data
    const imageSearch = (tag, setState) => {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&tags=${tag}&per_page=24&api_key=${apiKey}&format=json&nojsoncallback=1`)
            .then(response => {
                // handle success
            setState(response.data.photos.photo)
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

    useEffect(() => {
        if (defaultList) {
            imageSearch(props.defaultList[0], setDefault1);
            imageSearch(props.defaultList[1], setDefault2);
            imageSearch(props.defaultList[2], setDefault3);
            console.log('Fetched default imagesets')
        }
    }, [defaultList]);

    useEffect(() => {
        if (query) {
            console.log('there is a query!')
            imageSearch(query, setImageResults);
            setTitle(`Search Results for "${query}"`)
        } else if (tag !== "search") {
            imageSearch(props.tag, setImageResults)
            setTitle(`Images of ${props.tag}`)
        }
        }, [props.tag, query]);

    if (tag && tag.toLowerCase() === "search") {
        return(
            <h2>Please enter a search term or click one of the default tags above</h2>
        )
    }

    if (defaultList && defaultList.includes(tag) && tag !== "search") {
        console.log(`Tag: ${tag}`, 'Default list found!');
        const defaultIndex = defaultList.findIndex(testString => testString.toLowerCase() === tag.toLowerCase());
        console.log(defaultIndex);
        if (defaultIndex === 0) {
            return (
                <Grid images={default1} />
            )
        } else if (defaultIndex === 1) {
            return (
                <Grid images={default2} />
            )
        } else if (defaultIndex === 2) {
            return (
                <Grid images={default3} />
            )
        }
    }

    if (imageResults.length !== 0) {
        console.log('regular image search called! with the following images', imageResults)
        console.log('query: ' + query, 'tag: ' + tag)
        return(
            <Grid images={imageResults} />
        )
    } else if (imageResults.length === 0) {
        return(
            <NoResults query={query} />
        )
    };
}

export default ImageLoader;