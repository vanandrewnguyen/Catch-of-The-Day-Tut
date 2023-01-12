import React, { Component } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { toBeInTheDocument } from '@testing-library/jest-dom';
// Import components
import Router from '../components/Router';
import StorePicker from '../components/StorePicker';

describe('Test adding and removing a fish to the basket', () => {
    test('Base', async () => {
        // Call render function
        const { container } = render(<Router exact path="/" component={StorePicker} />);

        // Input unique name for the store
        const nameInput = container.querySelector(`input[type="text"]`);
        fireEvent.click(nameInput);
        userEvent.type(nameInput, `uniqueName`);
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

        // Check our total is zero, we haven't bought anything
        const totalPriceBefore = await waitFor(() => screen.getByText(`$0.00`));
        expect(totalPriceBefore).toBeInTheDocument();

        // Load sample fishes from database
        const loadButton = await waitFor(() => screen.getByText(`Load Sample Fishes`));
        expect(loadButton).toBeInTheDocument();
        fireEvent.click(loadButton);

        // Wait for fish to load
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Check we even have a removal button
        const addButton = await waitFor(() => screen.queryAllByText(`Add to Order`));
        await waitFor(() => {
            expect(addButton[0]).toBeInTheDocument();
        });
        fireEvent.click(addButton[0]);

        // Check our basket after adding
        // Should occur once in basket and once in menu display
        const totalPriceAfter = await waitFor(() => screen.getAllByText(`$17.24`));
        console.log(totalPriceAfter.length);
        expect(totalPriceAfter.length === 2).toBe(true);
        expect(screen.queryByText(`$0.00`)).not.toBeInTheDocument();

        // Remove the only fish from our basket
        const removeButton = await waitFor(() => screen.queryByText(`Del`));
        await waitFor(() => {
            expect(removeButton).toBeInTheDocument();
        });
        fireEvent.click(removeButton);

        // Now finally check our balance is zero again
        expect(screen.queryByText(`$0.00`)).toBeInTheDocument();
    });
});