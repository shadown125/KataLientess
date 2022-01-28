import { rest } from 'msw';

export const handlers = [
    rest.get("/api/user/getProfile", (req, res, ctx) => {
        return res(
            ctx.json(
                {
                    firstName: 'john',
                    image: '/dummyProfileImage.jpg',
                    lastName: 'doe',
                }
            )
        )
    }),
    rest.get('/api/user/getAllTodos', (req, res, ctx) => {
        return res(
            ctx.json(
                {
                    todos: [
                        {
                            id: '1',
                            title: 'First todo',
                            description: 'This is description for first todo',
                        },
                        {
                            id: '2',
                            title: 'Second todo',
                            description: 'This is description for second todo'
                        }
                    ]
                }
            )
        )
    }),
    rest.get('/api/user/getDoneTodos', (req, res, ctx) => {
        return res(
            ctx.json(
                {
                    doneTodos: [
                        {
                            id: '3',
                            title: 'First done todo',
                            description: 'This is description for first done todos',
                        },
                        {
                            id: '4',
                            title: 'Second done todo',
                            description: 'This is description for second done todos'
                        }
                    ],
                }
            )
        )
    }),
    rest.get('/api/user/getAllTodosAndDoneTodos', (req, res, ctx) => {
        return res(
            ctx.json(
                {
                    doneTodos: [
                        {
                            id: '3',
                            title: 'First done todo',
                            description: 'This is description for first done todos',
                        },
                        {
                            id: '4',
                            title: 'Second done todo',
                            description: 'This is description for second done todos'
                        }
                    ],
                    todos: [
                        {
                            id: '1',
                            title: 'First todo',
                            description: 'This is description for first todo',
                        },
                        {
                            id: '2',
                            title: 'Second todo',
                            description: 'This is description for second todo'
                        }
                    ]
                }
            )
        )
    })
]