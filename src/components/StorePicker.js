import React from 'react';
import { render } from 'react-dom';
import { getFunName } from '../helpers';
import PropTypes from 'prop-types';

class StorePicker extends React.Component {
    storeInput = React.createRef();

    static propTypes = {
        history: PropTypes.object,
    };

    rerouteToStore = event => {
        // Stop page from refreshing (default behaviour)
        event.preventDefault();
        
        const userInput = this.storeInput.current.value;
        this.props.history.push(`/store/${userInput}`);
    }

    render() {
        return (
            <form className="store-selector" onSubmit={this.rerouteToStore}>
                <h2>Please enter a store:</h2>
                <input type="text" 
                       ref={this.storeInput}
                       required placeholder='Store Name' 
                       defaultValue={getFunName()} />
                <button type="submit">Visit store</button>
            </form>
        );
    }
}

export default StorePicker;