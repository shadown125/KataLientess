/**
 * @jest-environment jsdom
 */

import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsName from "../pages/settings/name";
import * as nextRouter from "next/router";
import {SessionProvider} from "next-auth/react";
import {mockSessionProvider} from "../mocks/data";
import {settingsNameValidationSchema} from "../components/validationSchemas/settingsNameValidationSchema";

describe('settings name page', () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({route: '/', pathname: '/', prefetch: jest.fn().mockResolvedValue(undefined),}));
    const view = () => {
        render(
            <SessionProvider session={mockSessionProvider}>
                <SettingsName />
            </SessionProvider>
        );
    }

    it ('should handle first name input', async () => {
        view();

        const firstNameInput = screen.getByLabelText('Change name:*');
        const saveButton = screen.getByTestId('save');

        expect(firstNameInput).toBeInTheDocument();

        userEvent.click(saveButton);

        const errorFirstNameMessage = await screen.findByText('First name is a required field');
        expect(errorFirstNameMessage).toBeInTheDocument();

        userEvent.type(firstNameInput, 'john');

        await waitFor(() => {
            expect(errorFirstNameMessage).not.toBeInTheDocument();
        })
    });

    it ('should render last name input', () => {
        view();

        const lastNameInput = screen.getByLabelText('Change last name:');

        expect(lastNameInput).toBeInTheDocument();
    });

    it ('should render back to settings link', () => {
        view();

        const backToSettingsLink = screen.getByTestId('back-to-settings');

        expect(backToSettingsLink.getAttribute('href')).toBe('/settings');
    });

    it ('should handle validation', async () => {
        const falsyNameData = await settingsNameValidationSchema().isValid({
            firstName: '',
        });

        expect(falsyNameData).toEqual(false);

        const nameData = await settingsNameValidationSchema().isValid({
            firstName: 'john',
        });

        expect(nameData).toEqual(true);
    })
})