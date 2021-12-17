import {getSession} from "next-auth/react";
import {connectToDatabase} from "../../../lib/db";

async function uploadImage (req, res) {
    if (req.method !== 'POST') {
        return;
    }

    const session = await getSession({
        req: req,
    })

    if (!session) {
        res.status(401).json({message: 'Not authenticated!'});
        return;
    }

    const userEmail = session.user.email;
    const image = req.body.image;

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

    await db.collection('users').updateOne({
        email: userEmail
    }, {
        $set: {
            image: image
        },
    });

    res.status(201).json({
        message: image
    });
    await client.close();
}

export default uploadImage;