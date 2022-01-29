/**
 * @jest-environment jsdom
 */

import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as nextRouter from "next/router";
import {SessionProvider} from "next-auth/react";
import {mockSessionProvider} from "../mocks/data";
import SettingsPassword from "../pages/settings/password";
import {settingsPasswordValidationSchema} from "../components/validationSchemas/settingsPasswordValidationSchema";

describe('Settings password page', () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({route: '/', pathname: '/', prefetch: jest.fn().mockResolvedValue(undefined),}));
    const view = () => {
        render(
            <SessionProvider session={mockSessionProvider}>
                <SettingsPassword />
            </SessionProvider>
        );
    }

    it ('should handle password field', async () => {
        view();

        const passwordField = screen.getByLabelText('Password:*');
        const saveButton = screen.getByTestId('save');

        expect(passwordField).toBeInTheDocument();

        userEvent.click(saveButton);
        let errorMessagePassword = await screen.findByText('Password is a required field');

        expect(errorMessagePassword).toBeInTheDocument();

        userEvent.type(passwordField, 'john');
        errorMessagePassword = await screen.findByText('Password must be at least 6 characters');

        await waitFor(() => {
            expect(errorMessagePassword).toBeInTheDocument();
        });

        userEvent.type(passwordField, 'john12345567')
        errorMessagePassword = await screen.findByText('Password must Contain 8 Characters, One Uppercase, One Lowercase and One Number');

        await waitFor(() => {
            expect(errorMessagePassword).toBeInTheDocument();
        });

        userEvent.type(passwordField, 'John123456');

        await waitFor(() => {
            expect(errorMessagePassword).not.toBeInTheDocument();
        });
    });

    it ('should handle repeat password field', async () => {
        view();

        const repeatPasswordField = screen.getByLabelText('Repeat password');
        const saveButton = screen.getByTestId('save');

        expect(repeatPasswordField).toBeInTheDocument();

        userEvent.click(saveButton);
        let errorRepeatPasswordMessage = await screen.findByText('Repeat password is a required field');

        expect(errorRepeatPasswordMessage).toBeInTheDocument();

        userEvent.type(repeatPasswordField, 'john');
        errorRepeatPasswordMessage = await screen.findByText('Passwords must match');

        await waitFor(() => {
            expect(errorRepeatPasswordMessage).toBeInTheDocument();
        });
    });

    it ('should handle validation', async () => {
        let falsyPasswordData = await settingsPasswordValidationSchema().isValid({
            password: 'john',
            repeatedPassword: 'john',
        });

        expect(falsyPasswordData).toEqual(false);
        falsyPasswordData = await settingsPasswordValidationSchema().isValid({
            password: 'john',
            repeatedPassword: 'jo',
        });

        expect(falsyPasswordData).toEqual(false);
        falsyPasswordData = await settingsPasswordValidationSchema().isValid({
            password: 'qwertyuiop',
            repeatedPassword: 'qwertyuiop',
        });

        expect(falsyPasswordData).toEqual(false);
        falsyPasswordData = await settingsPasswordValidationSchema().isValid({
            password: 'qwertyuiop123',
            repeatedPassword: 'qwertyuiop123',
        });

        expect(falsyPasswordData).toEqual(false);
        const passwordData = await settingsPasswordValidationSchema().isValid({
            password: 'Qwertyuiop123',
            repeatedPassword: 'Qwertyuiop123',
        });

        expect(passwordData).toEqual(true);
    });

    it ('should render back to settings link', () => {
        view();

        const backToSettingsLink = screen.getByTestId('back-to-settings');

        expect(backToSettingsLink.getAttribute('href')).toBe('/settings');
    });
})