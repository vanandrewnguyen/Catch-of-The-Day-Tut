import React, { Component } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom'
import { toBeInTheDocument } from '@testing-library/jest-dom';
// Import components
import Router from '../components/Router';

// Check main app menu loads and titles and forms render
describe('Test main menu renders', () => {
    test('Base render', () => {
        // Call render function
        render(<Router />);

        // Check it displays normally
        const inputTitle = screen.getByText(`Please enter a store:`);
        const selectButton = screen.getByText(`Visit store`);
        expect(inputTitle).toBeInTheDocument();
        expect(selectButton).toBeInTheDocument();
        
        // Click into the main app
        fireEvent.click(selectButton);

        // Check renders
        const tagline = screen.getByText(`Fresh catches daily`);
        const orderTag = screen.getByText(`Order`);
        const inventoryTag = screen.getByText(`Inventory`);
        expect(tagline).toBeInTheDocument();
        expect(orderTag).toBeInTheDocument();
        expect(inventoryTag).toBeInTheDocument();
    });
})

// Check loading sample fishes works 
describe('Test loading sample fishes', () => {
    test('Base render', async () => {
        // Call render function
        render(<Router />);

        // We're already in the main menu, since router preserves
        const loadButton = screen.getByText(`Load Sample Fishes`);
        expect(loadButton).toBeInTheDocument();
        fireEvent.click(loadButton);

        // Need to wait a bit, since the sample fishes take less than a second to load
        await new Promise((r) => setTimeout(r, 1000));

        // Check renders
        const removeButton = screen.getAllByText('Remove Fish')[0];
        expect(removeButton).toBeInTheDocument();
    });
})



