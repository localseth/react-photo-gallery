// stateless component
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return(
        <nav className="main-nav">
            <ul>
                <Link to="/axolotyl" className="main-nav">Axolotyl</Link>
                <Link to="/capybara">Capybara</Link>
                <Link to="/bush-baby">Bush Baby</Link>
            </ul>
        </nav>
    )
};

export default Nav;