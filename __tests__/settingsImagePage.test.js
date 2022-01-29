/**
 * @jest-environment jsdom
 */

import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsImage from "../pages/settings/image";
import * as nextRouter from "next/router";
import {SessionProvider} from "next-auth/react";
import {mockSessionProvider} from "../mocks/data";
import {settingsImageValidationSchema} from "../components/validationSchemas/settingsImageValidationSchema";

describe('settings image page', () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({route: '/', pathname: '/', prefetch: jest.fn().mockResolvedValue(undefined),}));
    const view = () => {
        render(
            <SessionProvider session={mockSessionProvider}>
                <SettingsImage />
            </SessionProvider>
        );
    }

    it ('should handle image field', async () => {
        view();

        const imageField = screen.getByLabelText('Change profile image*:');
        const saveButton = screen.getByTestId('save');

        expect(imageField).toBeInTheDocument();

        userEvent.click(saveButton);

        const errorImageMessage = await screen.findByText('image is a required field');

        expect(errorImageMessage).toBeInTheDocument();
    });

    it ('should handle image validation', async () => {
        const falsyImageData = await settingsImageValidationSchema().isValid({
            image: '',
        });

        expect(falsyImageData).toEqual(false);

        const imageData = await settingsImageValidationSchema().isValid({
            image: 'john.jpg',
        });

        expect(imageData).toEqual(true);
    })

    it ('should render back to settings link', () => {
        view();

        const backToSettingsLink = screen.getByTestId('back-to-settings');

        expect(backToSettingsLink.getAttribute('href')).toBe('/settings');
    });
})