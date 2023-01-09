import React from "react";
import PropTypes from 'prop-types';
import { formatPrice } from "../helpers";

class FishDisplay extends React.Component {
    // Static means same across every instance
    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string, 
            status: PropTypes.string, 
            price: PropTypes.number
        }),
        addFishToOrder: PropTypes.func,
    }

    handleClick = () => {
        this.props.addFishToOrder(this.props.index);
    }

    render() {
        const { image, name, price, desc, status } = this.props.details;
        const isAvailable = status === 'available';

        return (
            <li className="menu-fish">
                <img src={image} alt={name} />
                <h3 className="fish-name">{name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button disabled={!isAvailable} onClick={this.handleClick}>{isAvailable ? 'Add to Order' : 'Sold out!'}</button>
            </li>
        );
    }
}


export default FishDisplay;