import React, { Component } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { toBeInTheDocument } from '@testing-library/jest-dom';
// Import components
import Router from '../components/Router';
import StorePicker from '../components/StorePicker';

// Check loading sample fishes works 
// need to reload the page -> fresh start
describe('Test loading and removing sample fishes', () => {
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

        // Check we even have a removal button
        const removeButton = await waitFor(() => screen.queryAllByText(`Remove Fish`));
        await waitFor(() => {
            expect(removeButton[0]).toBeInTheDocument();
        });
        fireEvent.click(removeButton[0]);

        // Check fish has been removed
        expect(halibutText[0]).not.toBeInTheDocument();
    });
})


test("Sanity check", () => {
    expect(true).toBe(true);
});



