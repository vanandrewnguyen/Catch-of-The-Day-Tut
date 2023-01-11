import React, { Component } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom'
import { toBeInTheDocument } from '@testing-library/jest-dom';
// Import components
import Router from '../components/Router';

describe('Render main menu Component', () => {
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
    });
})

