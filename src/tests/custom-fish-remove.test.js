import React, { Component } from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { toBeInTheDocument } from '@testing-library/jest-dom';
// Import components
import Router from '../components/Router';

// Check adding custom fish works 
describe('Test adding and removing custom fish', () => {
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
