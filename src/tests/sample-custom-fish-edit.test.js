import React, { Component } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { toBeInTheDocument } from '@testing-library/jest-dom';
// Import components
import Router from '../components/Router';
import StorePicker from '../components/StorePicker';
import { formatPrice } from '../helpers';

// Check loading sample fishes works 
// need to reload the page -> fresh start
describe('Test loading both sample and custom fishes', () => {
    test('Base', async () => {
        // Call render function
        const { container } = render(<Router exact path="/" component={StorePicker} />);

        // Input unique name for the store
        const selectButton = await waitFor(() => screen.getByText(`Visit store`));
        expect(selectButton).toBeInTheDocument();
        fireEvent.click(selectButton);

        // Should fail, since we aren't on the storepicker
        const inputTitle = screen.queryByText(`Please enter a store:`);
        expect(inputTitle).not.toBeInTheDocument();

        // In main menu now, check renders properly
        const tagline = await waitFor(() => screen.getByText(`Fresh catches daily`));
        const orderTag = await waitFor(() => screen.getByText(`Order`));
        const inventoryTag = await waitFor(() => screen.getByText(`Inventory`));
        expect(tagline).toBeInTheDocument();
        expect(orderTag).toBeInTheDocument();
        expect(inventoryTag).toBeInTheDocument();

        // Load sample fishes from database
        const loadButton = await waitFor(() => screen.getByText(`Load Sample Fishes`));
        expect(loadButton).toBeInTheDocument();
        fireEvent.click(loadButton);

        // Wait for fish to load
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Check fish has loaded
        const halibutText = await waitFor(() => screen.queryAllByText(`Pacific Halibut`));
        await waitFor(() => {
            expect(halibutText[0]).toBeInTheDocument();
        });

        // Edit form
        // Shouldn't have collision with sample fish
        // Input name into form
        const nameInput = await waitFor(() => container.querySelectorAll(`input[name="name"]`)[9]);
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
        const priceInput = await waitFor(() => container.querySelectorAll(`input[name="price"]`)[9]);
        const fishPrice = `1234`;
        await userEvent.type(priceInput, fishPrice);
        const fishPriceInput = await waitFor(() => screen.getByDisplayValue(fishPrice));
        expect(fishPriceInput).toBeInTheDocument();

        // Input desc
        await userEvent.tab();
        await userEvent.tab();
        const descInput = await waitFor(() => container.querySelectorAll(`textarea[name="desc"]`)[9]);
        const fishDesc = `fishdesc`;
        await userEvent.type(descInput, fishDesc);
        const fishDescInput = await waitFor(() => screen.getByDisplayValue(fishDesc));
        expect(fishDescInput).toBeInTheDocument();

        // Input image
        await userEvent.tab();
        const imageInput = await waitFor(() => container.querySelectorAll(`input[name="image"]`)[9]);
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




