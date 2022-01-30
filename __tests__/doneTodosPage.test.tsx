/**
 * @jest-environment jsdom
 */

import React from "react";
import {render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import DoneTodo from "../pages/done-todos";
import * as nextRouter from "next/router";
import {SessionProvider} from "next-auth/react";
import {mockSessionProvider} from "../mocks/data";

describe('Done Todos page', () => {
    // @ts-ignore
    nextRouter.useRouter = jest.fn();
    // @ts-ignore
    nextRouter.useRouter.mockImplementation(() => ({route: '/', pathname: '/done-todos', prefetch: jest.fn().mockResolvedValue(undefined),}));
    const view = () => {
        render(
            <SessionProvider session={mockSessionProvider}>
                <DoneTodo />
            </SessionProvider>
        );
    }

    it ('should render heading', async () => {
        view();

        await waitForElementToBeRemoved(() => screen.queryByTestId('done-todos-is-loading'));

        const headline = screen.getByTestId('done-todos-heading');

        expect(headline).toBeInTheDocument();
    });

    it ('should render done todos counter', async () => {
        view();

        await waitForElementToBeRemoved(() => screen.queryByTestId('progression-bar-is-loading'));
        const doneTodosCounter = screen.getByTestId('done-todos');

        expect(doneTodosCounter).toBeInTheDocument();
    })

    it ('should not render todos in progress', async () => {
        view();

        await waitForElementToBeRemoved(() => screen.queryByTestId('progression-bar-is-loading'));
        const todosCounter = screen.queryByTestId('in-progress-todos');

        expect(todosCounter).not.toBeInTheDocument();
    });

    it ('should not render add todo button', () => {
        view();

        const addTodoButton = screen.queryByTestId('add-todo-button');

        expect(addTodoButton).not.toBeInTheDocument();
    });

    it ('should render done todos', async () => {
        view();

        await waitForElementToBeRemoved(() => screen.queryByTestId('done-todos-is-loading'));
        const firstDoneTodoHeading = screen.getByText('First done todo');
        const firstDoneTodoDescription = screen.getByText('This is description for first done todos');

        expect(firstDoneTodoHeading).toBeInTheDocument();
        expect(firstDoneTodoDescription).toBeInTheDocument();

        const secondDoneTodoHeading = screen.getByText('Second done todo');
        const secondDoneTodoDescription = screen.getByText('This is description for second done todos');

        expect(secondDoneTodoHeading).toBeInTheDocument();
        expect(secondDoneTodoDescription).toBeInTheDocument();
    });

    it ('should only render the delete button for done todos', async () => {
        view();

        await waitForElementToBeRemoved(() => screen.queryByTestId('done-todos-is-loading'));
        const deleteButton = screen.getAllByText('Delete');

        expect(deleteButton[0]).toBeInTheDocument();
        expect(deleteButton[1]).toBeInTheDocument();

        const completeButton = screen.queryByText('Complete');

        expect(completeButton).not.toBeInTheDocument();
    })
})