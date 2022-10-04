import React, {
    useState,
    useEffect
} from 'react';
import {
  useParams
} from 'react-router-dom';
import '../App.css';

// Import Components
import Grid from './Grid';
import NoResults from './NoResults';
import NoRoute from './NoRoute';
import Loading from './Loading';

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

    // Set state for loading
    const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(true);
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
                console.log('no errors were encountered');
                setIsLoading(false);
            });
        }

    // Get default images
    useEffect(() => {
        if (defaultList) {
            imageSearch(props.defaultList[0], setDefault1);
            imageSearch(props.defaultList[1], setDefault2);
            imageSearch(props.defaultList[2], setDefault3);
            console.log('Fetched default imagesets')
        }
    }, [props.defaultList, defaultList]);

    // Get images form search or initial page load and set title of page
    useEffect(() => {
        if (query) {
            console.log('there is a query!')
            imageSearch(query, setImageResults);
            setTitle(`Search Results for "${query}"`)
        } else if (tag !== "search") {
            imageSearch(tag, setImageResults)
            setTitle(`Images of ${tag}`)
        }
    }, [tag, query]);


    if (isLoading) {
        console.log('Loading...')
        return(
            <Loading />
        )
    }
    // Look for tag in default list and return the matching images
    if (
            tag &&
            defaultList &&
            defaultList.includes(tag)
        ) {
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
    // If tag does not match default images, it is not a valid route. Display 404.
    } else if (
            tag &&
            defaultList &&
            !defaultList.includes(tag)
        ) {
        console.log('tag is not included in default list');
        return (
            <NoRoute />
        )
    }

    // Display images from search query
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