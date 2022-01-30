/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import HomePage from "../pages";
import * as nextRouter from "next/router";
import {SessionProvider} from "next-auth/react";
import {mockSessionProvider} from "../mocks/data";
import {addTodoValidationSchema} from "../components/validationSchemas/addTodoValidationSchema";

describe('Home Page', () => {
    // @ts-ignore
    nextRouter.useRouter = jest.fn();
    // @ts-ignore
    nextRouter.useRouter.mockImplementation(() => ({route: '/', pathname: '/', prefetch: jest.fn().mockResolvedValue(undefined),}));
    const view = () => {
        render(
            <SessionProvider session={mockSessionProvider}>
                <HomePage />
            </SessionProvider>
        );
    }

    it ('renders a heading', async () => {
        view();
        const heading = await screen.findByText(/KataLientesS/i);

        expect(heading).toBeDefined()
    });

    it ('renders brand logo', () => {
        view();
        const brandLogo = screen.getByTestId('brand-logo');

        expect(brandLogo).toBeDefined();
    });

    describe('All links', () => {
        it ('should link to portfolio website', () => {
            view();
            const portfolioLink = screen.getByTestId('portfolio-website-link');

            expect(portfolioLink.getAttribute('href')).toBe('https://www.akalientess.com/');
        });

        it ('should link to home page', async () => {
            view();
            const homePageLink = screen.getByRole('link', {
                name: /today/i,
            });

            await waitFor(() => {
                expect(homePageLink.getAttribute('href')).toBe('/');
            })
        });

        it ('should link to done todos page', async () => {
            view();
            const doneTodosPageLink = screen.getByRole('link', {
                name: /done todos/i,
            });

            await waitFor(() => {
                expect(doneTodosPageLink.getAttribute('href')).toBe('/done-todos');
            });
        });

        it ('should link to settings page', async () => {
            view();
            const settingsPageLink = screen.getByRole('link', {
                name: /settings/i,
            });

            await waitFor(() => {
                expect(settingsPageLink.getAttribute('href')).toBe('/settings');
            });
        });
    })

    describe('Navigation profile', () => {
        it ('should display profile image', async () => {
            view();

            await waitForElementToBeRemoved(() => screen.queryByTestId('nav-profile-is-loading'));
            const profileImage = screen.getByAltText(/profile image/i);

            expect(profileImage).toBeDefined();
        });

        it ('should display first name in profile', async () => {
            view();

            await waitForElementToBeRemoved(() => screen.queryByTestId('nav-profile-is-loading'));
            const profileFirstName = screen.getByText('john');

            expect(profileFirstName).toBeDefined();
        });

        it ('should display last name in profile', async () => {
            view();

            await waitForElementToBeRemoved(() => screen.queryByTestId('nav-profile-is-loading'));
            const profileLastName = screen.getByText('doe');

            expect(profileLastName).toBeDefined();
        });
    });

    describe('Progression bar', () => {
        it ('should render the heading', async () => {
            view();

            await waitForElementToBeRemoved(() => screen.queryByTestId('progression-bar-is-loading'));

            const heading = screen.getByTestId('progression-bar-heading');

            expect(heading).toBeDefined();
        });

        it ('should render the day element', async () => {
            view();

            await waitForElementToBeRemoved(() => screen.queryByTestId('progression-bar-is-loading'));

            const dayElement = screen.getByTestId('current-day');

            expect(dayElement).toBeDefined();
        });

        it ('should render the month element', async () => {
            view();

            await waitForElementToBeRemoved(() => screen.queryByTestId('progression-bar-is-loading'));

            const monthElement = screen.getByTestId('current-month');

            expect(monthElement).toBeDefined();
        });

        it ('should render the done todos counter element', async () => {
            view();

            await waitForElementToBeRemoved(() => screen.queryByTestId('progression-bar-is-loading'));

            const doneTodosCounter = screen.getByTestId('done-todos');

            expect(doneTodosCounter).toBeDefined();
        });

        it ('should render the todos counter element', async () => {
            view();

            await waitForElementToBeRemoved(() => screen.queryByTestId('progression-bar-is-loading'));

            const todos = screen.getByTestId('in-progress-todos');

            expect(todos).toBeDefined();
        });

    });

    describe('todos layout', () => {
        it ('should render todos heading', async () => {
            view();

            await waitForElementToBeRemoved(() => screen.queryByTestId('todos-layout-is-loading'));

            const heading = screen.getByTestId('todos-heading');

            expect(heading).toBeDefined();
        });

        it ('should render add todo button', async () => {
            view();

            await waitForElementToBeRemoved(() => screen.queryByTestId('todos-layout-is-loading'));

            const addTodoButton = screen.getByTestId('add-todo-button');

            expect(addTodoButton).toBeDefined();
        });

        it ('should render todos', async () => {
            view();

            await waitForElementToBeRemoved(() => screen.queryByTestId('todos-layout-is-loading'));

            const firstTodoHeadline = screen.getByText('First todo');
            const firstTodoDescription = screen.getByText('This is description for first todo');

            expect(firstTodoHeadline).toBeInTheDocument();
            expect(firstTodoDescription).toBeInTheDocument();

            const secondTodoHeadline = screen.getByText('Second todo');
            const secondTodoDescription = screen.getByText('This is description for second todo');

            expect(secondTodoHeadline).toBeInTheDocument();
            expect(secondTodoDescription).toBeInTheDocument();
        });

        it ('should render todo buttons', async () => {
            view();

            await waitForElementToBeRemoved(() => screen.queryByTestId('todos-layout-is-loading'));

            const completeButton = screen.getAllByText('Complete');
            const deleteButton = screen.getAllByText('Delete');

            expect(deleteButton[0]).toBeInTheDocument();
            expect(deleteButton[1]).toBeInTheDocument();
            expect(completeButton[0]).toBeInTheDocument();
            expect(completeButton[1]).toBeInTheDocument();
        });

        it ('should handle add todo popup', async () => {
            view();

            await waitForElementToBeRemoved(() => screen.queryByTestId('todos-layout-is-loading'));

            const addTodoPopup = screen.getByTestId('add-todo-popup');
            const addTodoButton = screen.getByTestId('add-todo-button');

            userEvent.click(addTodoButton);

            expect(addTodoPopup).toBeInTheDocument();

            const titleInput = screen.getByTestId('add-todo-title');
            const submitButton = screen.getByTestId('add-todo-submit');

            userEvent.click(submitButton);

            const getErrorTitleMessage = await screen.findByText(/Title is a required field/i);
            expect(getErrorTitleMessage).toBeInTheDocument();

            userEvent.type(titleInput, 'john');

            await waitFor(() => {
                expect(getErrorTitleMessage).not.toBeInTheDocument();
            });

            const popupCloseButton = screen.getByText('Close button');

            expect(popupCloseButton).toBeInTheDocument();
        });

        it ('should handle add todo validation', async () => {
            view();

            await waitForElementToBeRemoved(() => screen.queryByTestId('todos-layout-is-loading'));

            const addTodo = await addTodoValidationSchema().isValid({
                title: 'john',
            });

            expect(addTodo).toEqual(true);

            const addTodoFalsy = await addTodoValidationSchema().isValid({
                title: '',
            });

            expect(addTodoFalsy).toEqual(false);
        });
    })
})