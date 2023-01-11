import React, { useState } from 'react';
import PropTypes from 'prop-types';


const AddItemForm = ({ addFish }) => {
    // setForm is declared as a function here, no need for formal decleration
    // also note the default values
    const [form, setForm] = useState({
        name: '', price: '', status: '', description: '', image: '',
    })
    // see deconstruction of object from form obj
    const { name, price, status, description, image } = form

    const createFish = (event) => {
        //event.preventDefault();
        const fish = {
            name,
            price: parseFloat(price),
            status,
            desc: description,
            image,
        }
        addFish(fish);

        // Refresh form
        setForm({});
    }

    const maxTenChars = (field, value) => value && value.length < 10
    const setValue = (field, validator) => (e) => {
        const value = e.target.value;
        if (validator && !validator(field, value)) {
            alert(`Doesn't match conditions.`);
            return; 
        }
        setForm({...form, [field]: value});
    }

    return (
        <form className="fish-edit" onSubmit={() => createFish()}>
        <input name="name" value={name} onChange={setValue('name', maxTenChars)} type="text" placeholder='Name' />
        <input name="price" value={price} onChange={setValue('price')} type="text" placeholder='Price' />
        <select name="status" value={status} onChange={setValue('status')}>
            <option value="avaliable">Fresh!</option>
            <option value="unavaliable">Sold out.</option>
        </select>
        <textarea name="desc" value={description} onChange={setValue('description')} placeholder='Desc' />
        <input name="image" value={image} onChange={setValue('image')} type="text" placeholder='Image' />
        <button type="submit" onClick={() => createFish()}>+ Add Fish</button>
        </form>
    );
}

export default AddItemForm;


/*
class AddItemForm extends React.Component {
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    static propTypes = {
        addFish: PropTypes.func,
    };

    createFish = (event) => {
        event.preventDefault();

        const fish = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value,
        }

        this.props.addFish(fish);

        // Refresh form
        event.currentTarget.reset();
    }

    render() {
        return (
            <form className="fish-edit" onSubmit={this.createFish}>
                <input name="name" ref={this.nameRef} type="text" placeholder='Name' />
                <input name="price" ref={this.priceRef} type="text" placeholder='Price' />
                <select name="status" ref={this.statusRef}>
                    <option value="avaliable">Fresh!</option>
                    <option value="unavaliable">Sold out.</option>
                </select>
                <textarea name="desc" ref={this.descRef} placeholder='Desc' />
                <input name="image" ref={this.imageRef} type="text" placeholder='Image' />
                <button type="submit">+ Add Fish</button>
            </form>
        );
    }
}

export default AddItemForm;
*/