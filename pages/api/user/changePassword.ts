import {getSession} from "next-auth/react";
import {connectToDatabase} from "../../../lib/db";
import {hashPassword} from "../../../lib/auth";
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PATCH') {
        return;
    }

    const session = await getSession({req: req});

    if (!session) {
        res.status(401).json({message: 'Not authenticated!'});
        return;
    }

    const userEmail = session!.user!.email;
    const newPassword = req.body.repeatedPassword;

    const client = await connectToDatabase();
    const usersCollection = client.db().collection('users');
    const user = await usersCollection.findOne({
        email: userEmail,
    });

    if (!user) {
        res.status(404).json({
            message: 'User not found.',
        })
        await client.close();
        return;
    }
    const hashedPassword = await hashPassword(newPassword)

    await usersCollection.updateOne({
        email: userEmail
    }, {
        $set: {
            password: hashedPassword,
        },
    });

    await client.close();
    res.status(200).json({
        message: 'Password updated!',
    })
}

export default handler;