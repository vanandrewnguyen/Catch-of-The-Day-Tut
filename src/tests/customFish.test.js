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

// Check adding custom fish works 
describe('Test adding custom fish', () => {
    test('Base render', () => {
        // Call render function
        const { container } = render(<Router />);

        // Don't know if this is the 'right way' since should be blackbox -> through screen.getByText
        const nameInput = container.querySelector(`input[name="name"]`);
        expect(nameInput).toBeInTheDocument();
        fireEvent.click(nameInput);
        fireEvent.change(nameInput, { target: { value : "new fish "}});

    });
})


// Check removing fish from menu works


// Check editing fish from menu works


// Check adding fish to basket works


// Check removing fish from basket works

