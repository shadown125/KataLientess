/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import LoginPage from '../pages/login';
import {loginValidationSchema} from "../components/validationSchemas/loginValidationSchema";

describe('Login', () => {
    it ('checks if a heading exist', async () => {
        render(<LoginPage />);

        const heading = screen.getByRole('heading', {
            name: /login/i
        });

        expect(heading).toBeDefined()
    });

    it ('checks if email field exist', () => {
        render(<LoginPage />);
        const emailField = screen.getByPlaceholderText(/e-mail/i);

        expect(emailField).toBeDefined();
    });

    it ('checks if password field exist', () => {
        render(<LoginPage />);
        const passwordField = screen.getByPlaceholderText('Password');

        expect(passwordField).toBeDefined();
    })

    it ('checks if register button exist', () => {
        render(<LoginPage />);
        const registerButton = screen.getByRole('link', {
            name: /register/i
        });

        expect(registerButton).toBeDefined();
    });

    it ('checks if social links exists', () => {
        render(<LoginPage />);
        const github = screen.getByRole('link', {
            name: /github/i
        });
        const twitter = screen.getByRole('link', {
            name: /twitter/i
        });
        const linkedin = screen.getByRole('link', {
            name: /linkedin/i
        });

        expect(github).toBeDefined();
        expect(twitter).toBeDefined();
        expect(linkedin).toBeDefined();
    });

    it ('checks if login button exist', () => {
        render(<LoginPage />);
        const loginButton = screen.getByRole('button', {
            name: /login/i
        });

        expect(loginButton).toBeDefined();
    });

    it ('should show a required field for email input', async () => {
        render(<LoginPage />);
        const loginButton = screen.getByRole('button', {
            name: /login/i
        });

        userEvent.click(loginButton);

        const emailErrorMessage = await screen.findByText('Email is a required field');
        expect(emailErrorMessage).toBeVisible();
    });

    it ('should show invalid field error for invalid email input', async () => {
        render(<LoginPage />);
        const loginButton = screen.getByRole('button', {
            name: /login/i
        });
        const emailField = screen.getByPlaceholderText(/e-mail/i);

        userEvent.type(emailField, 'john');

        expect(emailField).toHaveValue('john');

        userEvent.click(loginButton);

        const emailErrorMessage = await screen.findByText('Email must be a valid');
        expect(emailErrorMessage).toBeVisible();
    });

    it ('should show a required field for password input', async () => {
        render(<LoginPage />);
        const loginButton = screen.getByRole('button', {
            name: /login/i
        });

        userEvent.click(loginButton);

        const passwordErrorMessage = await screen.findByText('Password is a required field');
        expect(passwordErrorMessage).toBeVisible();
    });

    it ('should handle validating object', async () => {
        const result = await loginValidationSchema().isValid({
            email: 'do@gmail.com',
            password: 'test'
        });

        expect(result).toEqual(true);
    });

    it ('should be link to register page', () => {
        render(<LoginPage />);
        const registerButton = screen.getByRole('link', {
            name: /register/i
        });

        expect(registerButton.getAttribute('href')).toBe('/register');
    })
})