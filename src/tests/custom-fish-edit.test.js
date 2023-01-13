import React, { Component } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { toBeInTheDocument } from '@testing-library/jest-dom';
// Import components
import Router from '../components/Router';
import StorePicker from '../components/StorePicker';
import { formatPrice } from '../helpers';

describe('Test editing a fish on the existing menu', () => {
    test('Base', async () => {
        // First load sample fish, then edit the first fish and see if changes apply
        // Don't do usual checks for loading sample fish, since already covered in another file
        // Call render function
        const { container } = render(<Router exact path="/" component={StorePicker} />);

        // Input unique name for the store
        const selectButton = await waitFor(() => screen.getByText(`Visit store`));
        expect(selectButton).toBeInTheDocument();
        fireEvent.click(selectButton);

        // Should fail, since we aren't on the storepicker
        const inputTitle = screen.queryByText(`Please enter a store:`);
        expect(inputTitle).not.toBeInTheDocument();

        // Load sample fishes from database
        const loadButton = await waitFor(() => screen.getByText(`Load Sample Fishes`));
        expect(loadButton).toBeInTheDocument();
        fireEvent.click(loadButton);

        // Wait for fish to load
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Target form

        // Edit name
        const nameInput = await waitFor(() => container.querySelectorAll(`input[name="name"]`)[0]);
        await waitFor(() => {
            expect(nameInput).toBeInTheDocument();
        });
        fireEvent.click(nameInput);
        userEvent.clear(nameInput);
        const fishName = 'newfishname';
        await userEvent.type(nameInput, fishName);
        expect(nameInput).toHaveValue(fishName);

        // Edit price
        const priceInput = await waitFor(() => container.querySelectorAll(`input[name="price"]`)[0]);
        await waitFor(() => {
            expect(priceInput).toBeInTheDocument();
        });
        fireEvent.click(priceInput);
        userEvent.clear(priceInput);
        const fishPrice = '1234';
        await userEvent.type(priceInput, fishPrice);
        expect(priceInput).toHaveValue(fishPrice);

        // Press update
        const updateButton = await waitFor(() => screen.getAllByText(`Update Fish`));
        await waitFor(() => {
            expect(updateButton[0]).toBeInTheDocument();
        });
        fireEvent.click(updateButton[0]);

        // Now test these values exists on the page, since in order
        // If this passes it means the new values have been updated on the menu
        const checkNewName = await waitFor(() => screen.getAllByText(fishName));
        const checkNewPrice = await waitFor(() => screen.getAllByText(formatPrice(fishPrice)));
        await waitFor(() => {
            expect(checkNewName[0]).toBeInTheDocument();
            expect(checkNewPrice[0]).toBeInTheDocument();
        });
    });
});