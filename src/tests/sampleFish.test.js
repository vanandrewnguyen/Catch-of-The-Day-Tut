import React, { Component } from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { toBeInTheDocument } from '@testing-library/jest-dom';
// Import components
import Router from '../components/Router';
import StorePicker from '../components/StorePicker';

// Check loading sample fishes works 
// need to reload the page -> fresh start
describe('Test loading sample fishes', () => {
    test('Base', () => {
        // Call render function
        const { container } = render(<Router exact path="/" component={StorePicker} />);

        // Unique
        const nameInput = container.querySelector(`input[type="text"]`);
        fireEvent.click(nameInput);
        userEvent.type(nameInput, `uniqueName`);
        const selectButton = screen.getByText(`Visit store`);
        expect(selectButton).toBeInTheDocument();
        fireEvent.click(selectButton);
        
        // In main menu, check renders
        const tagline = screen.getByText(`Fresh catches daily`);
        const orderTag = screen.getByText(`Order`);
        const inventoryTag = screen.getByText(`Inventory`);
        expect(tagline).toBeInTheDocument();
        expect(orderTag).toBeInTheDocument();
        expect(inventoryTag).toBeInTheDocument();

        // We're already in the main menu, since router preserves
        const loadButton = screen.getByText(`Load Sample Fishes`);
        expect(loadButton).toBeInTheDocument();
        fireEvent.click(loadButton);

        // Need to wait a bit, since the sample fishes take less than a second to load
        new Promise((r) => setTimeout(r, 1000));

        // Check renders
        const removeButton = screen.getAllByText('Remove Fish')[0];
        expect(removeButton).toBeInTheDocument();
    });
})




