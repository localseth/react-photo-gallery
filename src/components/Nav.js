// stateless component
import React from 'react';

const Nav = (props) => {
    const handleClick = (e) => {
        props.imageSearch(e.target.innerText.toLowerCase());
    }

    return(
        <nav className="main-nav">
            <ul>
                <li><a href='#' onClick={handleClick}>Axolotyl</a></li>
                <li><a href='#' onClick={handleClick}>Capybara</a></li>
                <li><a href='#' onClick={handleClick}>Bush Baby</a></li>
            </ul>
        </nav>
    )
};

export default Nav;