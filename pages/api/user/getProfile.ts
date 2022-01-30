import {getSession} from "next-auth/react";
import {connectToDatabase} from "../../../lib/db";
import type { NextApiRequest, NextApiResponse } from 'next';

async function getProfile (req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({
        req: req,
    })

    if (!session!.user!.email) {
        res.status(404).json({message: 'User not found'})
        return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const currentUser = await db.collection('users').findOne({
        email: session!.user!.email,
    })

    const username = {
        firstName: currentUser!.firstName,
        lastName: currentUser!.lastName,
        image: currentUser!.image,
    };

    res.status(201).json(username);
    await client.close();
}

export default getProfile;