// stateless component
import React from 'react';

const Nav = (props) => (
    <nav className="main-nav">
        <ul>
            {/* <li><a href='#' onClick={(props.imageSearch('cats'))}>Cats</a></li> */}
            <li><a href='#'>Dogs</a></li>
            <li><a href='#'>Computers</a></li>
        </ul>
  </nav>
);

export default Nav;