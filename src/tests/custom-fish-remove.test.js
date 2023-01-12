import React, { Component } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { toBeInTheDocument } from '@testing-library/jest-dom';
// Import components
import Router from '../components/Router';
import StorePicker from '../components/StorePicker';

// Check adding custom fish works 
describe('Test adding and removing custom fish', () => {
    test('Base render', async () => {
        // Call render function
        const { container } = render(<Router exact path="/" component={StorePicker} />);

        // Input unique name for the store
        const storeNameInput = container.querySelector(`input[type="text"]`);
        fireEvent.click(storeNameInput);
        userEvent.type(storeNameInput, `uniqueName`);
        const selectButton = await waitFor(() => screen.getByText(`Visit store`));
        expect(selectButton).toBeInTheDocument();
        fireEvent.click(selectButton);
        
        // Should fail, since we aren't on the storepicker
        const inputTitle = await waitFor(() => screen.queryByText(`Please enter a store:`));
        expect(inputTitle).not.toBeInTheDocument();

        // Edit the form
        // Don't know if this is the 'right way' since should be blackbox -> through screen.getByText
        const nameInput = await waitFor(() => container.querySelector(`input[name="name"]`));
        await waitFor(() => {
            expect(nameInput).toBeInTheDocument();
        });
        fireEvent.click(nameInput);
        userEvent.type(nameInput, `fishname`);

        const priceInput = await waitFor(() => container.querySelector(`input[name="price"]`));
        await waitFor(() => {
            expect(priceInput).toBeInTheDocument();
        });
        fireEvent.click(priceInput);
        userEvent.type(priceInput, `100`);

        const descInput = await waitFor(() => container.querySelector(`textarea[name="desc"]`));
        await waitFor(() => {
            expect(descInput).toBeInTheDocument();
        });
        fireEvent.click(descInput);
        userEvent.type(descInput, `fishdesc`);

        const imageInput = await waitFor(() => container.querySelector(`input[name="image"]`));
        await waitFor(() => {
            expect(imageInput).toBeInTheDocument();
        });
        fireEvent.click(imageInput);
        userEvent.type(imageInput, `urltest`);

        // Wait for fish to load
        await new Promise(resolve => setTimeout(resolve, 500));

        // Add
        const addButton = await waitFor(() => container.querySelector(`button[type="submit"]`));
        await waitFor(() => {
            expect(addButton).toBeInTheDocument();
        });
        fireEvent.click(addButton); //?? breaks the async test in sampleFish test
        
        /*
        logging from app.js -> shows what the fish obj is...
        todo: double check input values are correct

        console.log
        {
            name: '',
            price: NaN,
            status: '',
            desc: '',
            image: 'uf1funi0iris0slqhhtundeeaesNmstaecme'
        }

        at addFish (src/components/App.js:53:17)
        ???

        */

    });
})
