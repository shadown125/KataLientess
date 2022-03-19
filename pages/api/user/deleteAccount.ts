import {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "next-auth/react";
import {connectToDatabase} from "../../../lib/db";

const deleteAccount = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'DELETE') {
        return;
    }

    const session = await getSession({
        req: req,
    })

    if (!session) {
        res.status(401).json({
            message: 'Not authenticated!'
        });
    }

    const client = await connectToDatabase();
    const usersCollection = client.db().collection('users');
    const user = await usersCollection.findOne({
        email: session!.user!.email,
    })

    if (!user) {
        res.status(404).json({
            message: 'User not found.',
        });

        await client.close();

        return;
    }

    await usersCollection.deleteOne({
        "_id": user!._id
    });

    res.status(200).json({
        message: "User deleted!"
    });

    await client.close();
}

export default deleteAccount;