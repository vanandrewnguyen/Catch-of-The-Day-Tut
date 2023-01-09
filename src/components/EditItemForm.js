import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EditItemForm = ({index, fish, updateFish, deleteFish}) => {
    const handleChange = (event) => {
        // Update the fish, go upstream back into app
        //console.log(event.currentTarget.value);
        //console.log(typeof event.currentTarget.value);

        // Could maybe store set datatypes and lock them another way? Maybe in global enum or dictionary...
        // Too hard-coded
        let newVal = event.currentTarget.value;
        if (event.currentTarget.name === 'price') {
            newVal = Number(newVal);
        }
        const newFish = { 
            ...fish,
            [event.currentTarget.name]: newVal
        };

        updateFish(index, newFish);
    }

    // Edit from component class: changes to access for fish attributes and functions.
    return (
        <div className='fish-edit'>
            <input type='text' name='name' value={fish.name} onChange={(e) => handleChange(e)}/>
            <input type='text' name='price' value={fish.price} onChange={(e) => handleChange(e)}/>
            <select type='text' name='status' >
                <option value='available'>Fresh!</option>
                <option value='unavailable'>Sold out!</option>
            </select>
            <textarea name='desc' value={fish.desc} onChange={(e) => handleChange(e)}/>
            <input type='text' name='image' value={fish.image} onChange={(e) => handleChange(e)}/>

            <button onClick={() => deleteFish(index)}>Remove Fish</button>
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



