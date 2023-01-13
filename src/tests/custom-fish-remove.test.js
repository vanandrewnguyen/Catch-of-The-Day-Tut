import React, { Component } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { toBeInTheDocument } from '@testing-library/jest-dom';
// Import components
import Router from '../components/Router';
import StorePicker from '../components/StorePicker';
import { formatPrice } from '../helpers';

// Check adding custom fish works 
describe('Test adding and removing custom fish', () => {
    test('Base render', async () => {
        // Call render function
        const { container } = render(<Router exact path="/" component={StorePicker} />);

        // Input unique name for the store
        const selectButton = await waitFor(() => screen.getByText(`Visit store`));
        expect(selectButton).toBeInTheDocument();
        fireEvent.click(selectButton);
        
        // Should fail, since we aren't on the storepicker
        const inputTitle = await waitFor(() => screen.queryByText(`Please enter a store:`));
        expect(inputTitle).not.toBeInTheDocument();

        // Edit the form
        // Don't know if this is the 'right way' since should be blackbox -> through screen.getByText
        
        // Input name into form
        const nameInput = await waitFor(() => container.querySelector(`input[name="name"]`));
        await waitFor(() => {
            expect(nameInput).toBeInTheDocument();
        });
        fireEvent.click(nameInput);
        const fishName = `fishname`;
        await userEvent.type(nameInput, fishName);
        expect(nameInput).toHaveValue(fishName);
        const fishNameInput = await waitFor(() => screen.getByDisplayValue(fishName));
        expect(fishNameInput).toBeInTheDocument();

        // Input price into form
        await userEvent.tab();
        const priceInput = await waitFor(() => container.querySelector(`input[name="price"]`));
        const fishPrice = `1234`;
        await userEvent.type(priceInput, fishPrice);
        const fishPriceInput = await waitFor(() => screen.getByDisplayValue(fishPrice));
        expect(fishPriceInput).toBeInTheDocument();

        // Input desc
        await userEvent.tab();
        await userEvent.tab();
        const descInput = await waitFor(() => container.querySelector(`textarea[name="desc"]`));
        const fishDesc = `fishdesc`;
        await userEvent.type(descInput, fishDesc);
        const fishDescInput = await waitFor(() => screen.getByDisplayValue(fishDesc));
        expect(fishDescInput).toBeInTheDocument();

        // Input image
        await userEvent.tab();
        const imageInput = await waitFor(() => container.querySelector(`input[name="image"]`));
        const fishImage = `fishurl`;
        await userEvent.type(imageInput, fishImage);
        const fishImageInput = await waitFor(() => screen.getByDisplayValue(fishImage));
        expect(fishImageInput).toBeInTheDocument();

        // Finally, save that fish
        const addButton = await waitFor(() => container.querySelector(`button[type="submit"]`));
        await waitFor(() => {
            expect(addButton).toBeInTheDocument();
        });
        fireEvent.click(addButton);

        // Check it exists by checking price tag exists ($12.34) because 1234 alr exists
        const priceTag = await waitFor(() => screen.getAllByText(formatPrice(fishPrice)));
        await waitFor(() => {
            expect(priceTag[0]).toBeInTheDocument();
        });
    });
})
