import React from 'react';
import { formatPrice } from "../helpers";
import PropTypes from 'prop-types';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {
    static propTypes = {
        removeFishFromOrder: PropTypes.func,
        fishes: PropTypes.object,
        order: PropTypes.object,
    };

    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];

        const isAvailable = fish && fish.status === 'available';
        if (!fish) return null;
        if (!isAvailable) {
            return (
                <li key={key}>
                    Sorry {fish ? fish.name : 'fish'} is no longer available.
                </li>
            );
        }

        return (
            <li key={key}>
                {count} lbs {fish.name} {formatPrice(count * fish.price)}
                <button onClick={() => this.props.removeFishFromOrder(key) }>Del</button>
            </li>
        );
    }

    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        }, 0);

        return (
            <div className='order-wrap'>
                <h2>Order</h2>
                <ul className="order">
                    { orderIds.map(this.renderOrder) }
                </ul>
                <div className="total">
                    Total: 
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;