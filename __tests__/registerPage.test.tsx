/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import * as nextRouter from 'next/router';
import Register from '../pages/register';
import {registerValidationSchema} from "../components/validationSchemas/registerValidationSchema";

describe('Register', () => {
    // @ts-ignore
    nextRouter.useRouter = jest.fn();
    // @ts-ignore
    nextRouter.useRouter.mockImplementation(() => ({ route: '/', pathname: '/', prefetch: jest.fn().mockResolvedValue(undefined), }));

    it ('renders a heading', () => {
        render(<Register />);
        const heading = screen.getByTestId('register');

        expect(heading).toBeDefined()
    });

    it ('checks if first name field exist', () => {
        render(<Register />);
        const firstNameInput = screen.getByRole('textbox', {
            name: /first name/i
        });

        expect(firstNameInput).toBeDefined();
    });

    it ('checks if last name field exist', () => {
        render(<Register />);
        const lastNameInput = screen.getByPlaceholderText(/last name/i);

        expect(lastNameInput).toBeDefined();
    });

    it ('checks if email field exist', () => {
        render(<Register />);
        const emailField = screen.getByPlaceholderText(/e-mail/i);

        expect(emailField).toBeDefined();
    });

    it ('checks if profile image field exist', () => {
        render(<Register />);
        const profileImageField = screen.getByLabelText(/profile image/i);

        expect(profileImageField).toBeDefined();
    });

    it ('checks if password field exist', () => {
        render(<Register />);
        const passwordField = screen.getByPlaceholderText('Password');

        expect(passwordField).toBeDefined();
    })

    it ('checks if repeat password field exist', () => {
        render(<Register />);
        const repeatPasswordField = screen.getByPlaceholderText(/repeat password/i);

        expect(repeatPasswordField).toBeDefined();
    });

    it ('checks if back to login button exist', () => {
        render(<Register />);
        const backToLoginButton = screen.getByRole('link', {
            name: /back to login/i,
        });

        expect(backToLoginButton).toBeDefined();
    });

    it ('checks if submit button exist', () => {
        render(<Register />);
        const submitButton = screen.getByRole('button', {
            name: /submit/i,
        });

        expect(submitButton).toBeDefined();
    });

    it ('checks if back to login button link to login page', () => {
        render(<Register />);
        const backToLoginButton = screen.getByRole('link', {
            name: /back to login/i,
        });

        expect(backToLoginButton.getAttribute('href')).toBe('/login');
    });

    it ('should throw error when first name field is empty', async () => {
        render(<Register />);
        const submitButton = screen.getByRole('button', {
            name: /submit/i,
        });

        userEvent.click(submitButton);
        const firstNameErrorMessage = await screen.findByText(/First name is a required field/i);

        await waitFor(() => {
            expect(firstNameErrorMessage).toBeVisible();
        });
    });

    it ('should throw error when e-mail field is empty', async () => {
        render(<Register />);
        const submitButton = screen.getByRole('button', {
            name: /submit/i,
        });

        userEvent.click(submitButton);
        const emailErrorMessage = await screen.findByText(/Email is a required field/i);

        await waitFor(() => {
            expect(emailErrorMessage).toBeVisible();
        });
    });

    it ('should throw error when password field is empty', async () => {
        render(<Register />);
        const submitButton = screen.getByRole('button', {
            name: /submit/i,
        });

        userEvent.click(submitButton);
        const passwordErrorMessage = await screen.findByText('Password is a required field');

        await waitFor(() => {
            expect(passwordErrorMessage).toBeVisible();
        });
    });

    it ('should throw error when repeat password field is empty', async () => {
        render(<Register />);
        const submitButton = screen.getByRole('button', {
            name: /submit/i,
        });

        userEvent.click(submitButton);
        const repeatPasswordErrorMessage = await screen.findByText(/Repeat password is a required field/i);

        await waitFor(() => {
            expect(repeatPasswordErrorMessage).toBeVisible();
        })
    });

    it ('should successfully go through validating schema', async () => {
        const registerData = await registerValidationSchema().isValid({
            firstName: 'John',
            email: 'do@gmail.com',
            password: 'Qwerty123',
            repeatedPassword: 'Qwerty123',
        });

        expect(registerData).toEqual(true);
    });

    it ('should throw validating error', async () => {
        const registerData = await registerValidationSchema().isValid({
            firstName: 'John',
            email: 'do@gmail.com',
            password: 'Qwerty123',
            repeatedPassword: 'Qwerty1234',
        });

        expect(registerData).toEqual(false);
    });

    it ('should throw error when password have less than 6 characters', async () => {
        const registerData = await registerValidationSchema().isValid({
            firstName: 'John',
            email: 'do@gmail.com',
            password: '123',
            repeatedPassword: '123',
        });

        expect(registerData).toEqual(false);
    });

    it ('should throw error when password have no uppercase character', async () => {
        const registerData = await registerValidationSchema().isValid({
            firstName: 'John',
            email: 'do@gmail.com',
            password: '1232132qwe',
            repeatedPassword: '1232132qwe',
        });

        expect(registerData).toEqual(false);
    });

    it ('should throw error when password have no lowercase character', async () => {
        const registerData = await registerValidationSchema().isValid({
            firstName: 'John',
            email: 'do@gmail.com',
            password: '1232132Q',
            repeatedPassword: '1232132Q',
        });

        expect(registerData).toEqual(false);
    });

    it ('should throw error when password have no numbers', async () => {
        const registerData = await registerValidationSchema().isValid({
            firstName: 'John',
            email: 'do@gmail.com',
            password: 'Qwertyuiuiut',
            repeatedPassword: 'Qwertyuiuiut',
        });

        expect(registerData).toEqual(false);
    });

    it ('checks if social links exists', () => {
        render(<Register />);
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
})