import React from 'react';

const NoResults = (props) => (
    <div className="container">
        <h1>No Results Found</h1>
        <p>Your search for "{props.query}" did not return any results. Please try again.</p>
    </div>
)

export default NoResults;