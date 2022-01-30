/**
 * @jest-environment jsdom
 */

import React from "react";
import {render, screen} from "@testing-library/react";
import Settings from "../pages/settings";
import * as nextRouter from "next/router";
import {SessionProvider} from "next-auth/react";
import {mockSessionProvider} from "../mocks/data";

describe('Settings page', () => {
    // @ts-ignore
    nextRouter.useRouter = jest.fn();
    // @ts-ignore
    nextRouter.useRouter.mockImplementation(() => ({route: '/', pathname: '/settings', prefetch: jest.fn().mockResolvedValue(undefined),}));
    const view = () => {
        render(
            <SessionProvider session={mockSessionProvider}>
                <Settings />
            </SessionProvider>
        );
    }

    it ('should render links', () => {
        view();

        const changeNameLink = screen.getByTestId('change-name');
        const changePasswordLink = screen.getByTestId('change-password');
        const changeImageLink = screen.getByTestId('change-image');

        expect(changeNameLink.getAttribute('href')).toBe('/settings/name');
        expect(changePasswordLink.getAttribute('href')).toBe('/settings/password');
        expect(changeImageLink.getAttribute('href')).toBe('/settings/image');
    });

    it ('should render logout button', () => {
        view();

        const logoutButton = screen.getByTestId('settings-logout');

        expect(logoutButton).toBeInTheDocument();
    });

    it ('should render close popup button and handle it', () => {
        view();

        const closePopupButton = screen.getByTestId('close-popup');

        expect(closePopupButton).toBeInTheDocument();
        expect(closePopupButton.getAttribute('href')).toBe('/');
    })
})