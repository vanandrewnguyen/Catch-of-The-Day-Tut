import React from 'react';
import AddItemForm from './AddItemForm';
import EditItemForm from './EditItemForm';
import PropTypes from 'prop-types';

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
    };
    
    render() {
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                { Object.keys(this.props.fishes).map(key => <EditItemForm key={key} 
                                                                          index={key} 
                                                                          fish={this.props.fishes[key]}
                                                                          updateFish={this.props.updateFish}
                                                                          deleteFish={this.props.deleteFish}
                                                                          />) }
                <AddItemForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;