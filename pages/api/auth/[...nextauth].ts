import NextAuth from 'next-auth';
import CredentialProvider from "next-auth/providers/credentials";

import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
    providers: [
        CredentialProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "E-Mail",
                    type: "email",
                },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const client = await connectToDatabase();

                const usersCollection = client.db().collection('users');

                const user = await usersCollection.findOne({
                    email: credentials!.email,
                });

                if (!user) {
                    await client.close();
                    throw new Error('No user found!');
                }

                const isValid = await verifyPassword(
                    credentials!.password,
                    user.password
                );

                if (!isValid) {
                    await client.close();
                    throw new Error('Could not log you in!');
                }

                await client.close();
                return {
                    email: user.email
                };
            }
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.email = user.email;
            }

            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.email = token.email;
            }

            return session;
        },
    },
    secret: process.env.SECRET,
    jwt: {
        secret: process.env.SECRET,
    },
    session: {
        maxAge: 2 * 60 * 60,
        updateAge: 5 * 60,
    }
});