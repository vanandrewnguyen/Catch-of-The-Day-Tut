import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EditItemForm = ({index, fish, updateFish, deleteFish}) => {
    // Local store of form data
    // Initial state needs to pull from fish (and check undefined edge case)
    // Can't assign base attributes name, price etc to fish, only form
    // Since we'll manipulate form only
    const [form, setForm] = useState({
        name: (fish) ? fish.name : '', 
        price: (fish) ? fish.price : '', 
        status: (fish) ? fish.status : '', 
        desc: (fish) ? fish.desc : '', 
        image: (fish) ? fish.image : '',
    });
    const { name, price, status, desc, image } = form;

    const betweenTwentyChars = (value) => value && value.length < 20 //&& value.length > 0
    const isANumber = (value) => value && !isNaN(value);
    const handleKeystroke = (event, validator) => {
        // Handle keystrokes to affect state, not the database
        // Uses optional validator for some inputs, can add new ones for say price, url
        if (validator && !validator(event.currentTarget.value)) {
            alert(`Doesn't match conditions.`);
            return; 
        }
        setForm({...form, [event.currentTarget.name]: event.currentTarget.value});
    }

    const sendUpdate = (index) => {
        // Create a new obj and send this to the database, only on button press
        const updatedFish = {
            name, price: Number(price), status, desc, image,
        }
        updateFish(index, updatedFish);
    } 

    // Edit from component class: changes to access for fish attributes and functions.
    // Todo: fix name and price have validators seen above
    // But test breaks on userEvent.type? Seems to always trigger the lose conditions
    return (
        <div className='fish-edit'>
            <input type='text' name='name' value={name} onChange={(e) => handleKeystroke(e)}/>
            <input type='text' name='price' value={price} onChange={(e) => handleKeystroke(e)}/>
            <select type='text' name='status' value={status} onChange={(e) => handleKeystroke(e)}>
                <option value='available'>Fresh!</option>
                <option value='unavailable'>Sold out!</option>
            </select>
            <textarea name='desc' value={desc} onChange={(e) => handleKeystroke(e)}/>
            <input type='text' name='image' value={image} onChange={(e) => handleKeystroke(e)}/>

            <button onClick={() => deleteFish(index)}>Remove Fish</button>
            <button onClick={() => sendUpdate(index)}>Update Fish</button>
        </div>
    )
}

export default EditItemForm;




/*
old class
class EditItemForm extends React.Component {
    static propTypes = {
        // Shape is used when describing an obj where key data types are known ahead of time
        fish: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string, 
            status: PropTypes.string, 
            price: PropTypes.number
        }),
        index: PropTypes.string,
        updateFish: PropTypes.func,
    };
    
    handleChange = (event) => {
        // Update the fish, go upstream back into app
        const updatedFish = { 
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value 
        };

        this.props.updateFish(this.props.index, updatedFish);

        console.log(updatedFish);
    }

    render() {
        return (
            <div className='fish-edit'>
                <input type='text' name='name' onChange={this.handleChange} value={this.props.fish.name} />
                <input type='text' name='price' onChange={this.handleChange} value={this.props.fish.price} />
                <select type='text' name='status' onChange={this.handleChange} value={this.props.fish.status}>
                    <option value='available'>Fresh!</option>
                    <option value='unavailable'>Sold out!</option>
                </select>
                <textarea name='desc' onChange={this.handleChange} value={this.props.fish.desc} />
                <input type='text' name='image' onChange={this.handleChange} value={this.props.fish.image} />

                <button onClick={() => this.props.deleteFish(this.props.index) } >Remove Fish</button>
            </div>
        );
    }
}
*/



