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
]