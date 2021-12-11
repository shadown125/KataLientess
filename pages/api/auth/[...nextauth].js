import NextAuth from 'next-auth';
import Providers from 'next-auth/providers/credentials';

import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
    session: {
        jwt: true,
    },
    providers: [
        Providers({
            async authorize(credentials) {
                const client = await connectToDatabase();

                const usersCollection = client.db().collection('users');

                const user = await usersCollection.findOne({
                    email: credentials.email,
                });

                if (!user) {
                    await client.close();
                    throw new Error('No user found!');
                }

                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    await client.close();
                    throw new Error('Could not log you in!');
                }

                await client.close();
                return {
                    email: user.email,
                };
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user
            return session
        }
    }
});