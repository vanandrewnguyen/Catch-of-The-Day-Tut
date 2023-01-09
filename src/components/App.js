import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from "../sample-fishes";
import FishDisplay from './FishDisplay';
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object,
    }

    // When mounting and unmounting hook up the database
    componentDidMount() { 
        // Destructure syntax using js
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);
        // If local storage exists, then set the state of the order
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    };

    componentWillUnmount() {
        base.removeBinding(this.ref);
    };

    // Storing order in local storage -> when updating anything we update local storage
    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    };

    // Methods that update state must exist within the same component
    addFish = (fish) => {
        // Copy existing state
        const fishes = {...this.state.fishes}; // shallow copy

        // Add new fish
        // Modify state (not directly)
        fishes[`fish${Date.now()}`] = fish;
        this.setState({
            fishes: fishes
        });
    };

    updateFish = (key, updatedFish) => {
        // Copy curr fish
        const fishes = { ...this.state.fishes };
        // Update
        fishes[key] = updatedFish;
        // Set
        this.setState({ fishes: fishes });
    };

    deleteFish = (key) => {
        const fishes = { ...this.state.fishes };
        fishes[key] = null;
        this.setState({ fishes: fishes });
    };

    loadSampleFishes = () => {
        this.setState({ fishes : sampleFishes });
    };

    addFishToOrder = (key) => {
        // Copy state
        const order = { ...this.state.order };
        // Add to order or update order number
        order[key] = order[key] + 1 || 1;
        // Set state
        this.setState({
            order: order
        })
    };

    removeFishFromOrder = (key) => {
        const order = { ...this.state.order };
        // difference between delete and fish[key] = null
        // for fish we need to chuck it to firebase, so setting null is same as delete (but firebase needs null)
        // Since order is local only we can just delete like below
        delete order[key];
        this.setState({ order: order });
    }
    
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh catches daily" />
                    <ul className="fishes">
                        { /* Loop over all the fish in jsx */}
                        { Object.keys(this.state.fishes).map(key => <FishDisplay key={key} 
                                                                                 index={key} 
                                                                                 details={this.state.fishes[key]}
                                                                                 addFishToOrder={this.addFishToOrder}
                                                                                 />) }
                    </ul>
                </div>
                <Order fishes={this.state.fishes} 
                       order={this.state.order} 
                       removeFishFromOrder={this.removeFishFromOrder}
                       /> 
                <Inventory 
                    addFish={this.addFish} 
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    />
            </div>
        );
    }
}

export default App;