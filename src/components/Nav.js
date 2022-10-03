// stateless component
import React from 'react';
import { Link } from 'react-router-dom';

// uppercase function found at https://www.w3docs.com/snippets/javascript/how-to-capitalize-the-first-letter-in-a-string-in-javascript.html
const makeTitle = (str) => {
    return (
        str.charAt(0).toUpperCase() + str.slice(1)
    );
}

const Nav = (props) => {
    return(
        <nav className="main-nav">
            <ul className="main-nav">
                {props.defaultList.map((item, i) => {
                    return(<li key={i} className="main-nav"><Link to={item} className="main-nav">{makeTitle(item)}</Link></li>)
                })}
            </ul>
        </nav>
    )
};

export default Nav;