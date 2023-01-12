import React, { Component } from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { toBeInTheDocument } from '@testing-library/jest-dom';
// Import components
import Router from '../components/Router';

/*
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
        userEvent.type(nameInput, `fishname`);

        const priceInput = container.querySelector(`input[name="price"]`);
        expect(priceInput).toBeInTheDocument();
        fireEvent.click(priceInput);
        userEvent.type(priceInput, `100`);

        const descInput = container.querySelector(`textarea[name="desc"]`);
        expect(descInput).toBeInTheDocument();
        fireEvent.click(descInput);
        userEvent.type(descInput, `fishdesc`);

        const imageInput = container.querySelector(`input[name="image"]`);
        expect(imageInput).toBeInTheDocument();
        fireEvent.click(imageInput);
        userEvent.type(imageInput, `urltest`);

        const addButton = container.querySelector(`button[type="submit"]`);
        expect(addButton).toBeInTheDocument();
        fireEvent.click(addButton); //?? breaks the async test in sampleFish test
    });
})
*/

// Check removing fish from menu works


// Check editing fish from menu works


// Check adding fish to basket works


// Check removing fish from basket works


test("Sanity check", () => {
    expect(true).toBe(true);
});

