import React from 'react';
import PropType from 'prop-types';

// Refactored this from a react component to stateless functional component, since 
// rule of thumb is for rendering only components with little logic to be reformatted as functions
const Header = (props) => {
    return (
        <header className="top">
            <h1>Catch
                <span className="ofThe">
                    <span className="of">Of</span>
                    <span className="the">The</span>
                </span>
                day!</h1>
            <h3 className="tagline">
                <span>{props.tagline}</span>
            </h3>
        </header>
    );
}

Header.propTypes = {
    tagline: PropType.string.isRequired
}

export default Header;