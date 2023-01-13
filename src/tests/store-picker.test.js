import React, { Component } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { toBeInTheDocument } from '@testing-library/jest-dom';
// Import components
import StorePicker from '../components/StorePicker';
import Router from '../components/Router';

describe('Render main menu Component', () => {
    test('Base render', async () => {
        // Call render function
        render(<Router />);

        // Check it displays normally
        const inputTitle = await waitFor(() => screen.getByText(`Please enter a store:`));
        const selectButton = await waitFor(() => screen.getByText(`Visit store`));
        await waitFor(() => {
            expect(inputTitle).toBeInTheDocument();
            expect(selectButton).toBeInTheDocument();
        });
        
        // Input unique name for the store
        const nameInput = await waitFor(() => screen.getByPlaceholderText(`Store Name`));
        fireEvent.click(nameInput);
        await userEvent.type(nameInput, `uniqueName`);
        expect(selectButton).toBeInTheDocument();
        fireEvent.click(selectButton);
        
        // Should fail, since we aren't on the storepicker
        expect(inputTitle).not.toBeInTheDocument();
    });
})
