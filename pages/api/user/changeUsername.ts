import {getSession} from "next-auth/react";
import {connectToDatabase} from "../../../lib/db";
import type { NextApiRequest, NextApiResponse } from 'next';

async function changeUsername (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PATCH') {
        return;
    }

    const session = await getSession({
        req: req,
    })

    if (!session) {
        res.status(401).json({message: 'Not authenticated!'});
        return;
    }

    const userEmail = session!.user!.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const client = await connectToDatabase();

    const db = client.db();

    const user = await db.collection('users').findOne({
        email: userEmail,
    });

    if (!user) {
        res.status(404).json({
            message: 'User not found.',
        })
        await client.close();
        return;
    }

    if (lastName === '') {
        await db.collection('users').updateOne({
            email: userEmail
        }, {
            $set: {
                firstName: firstName
            },
        });

        res.status(201).json({
            message: "First name updated"
        });
        await client.close();

        return;
    }

    await db.collection('users').updateOne({
        email: userEmail
    }, {
        $set: {
            firstName: firstName,
            lastName: lastName,
        },
    });

    res.status(201).json({
        message: "First name and Last name updated"
    });
    await client.close();
}

export default changeUsername;