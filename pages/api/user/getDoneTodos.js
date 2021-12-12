import {connectToDatabase} from "../../../lib/db";
import {getSession} from "next-auth/react";

async function getDoneTodos(req, res) {
    const session = await getSession({
        req: req,
    })

    const sessionUser = session.user.email;

    if (!sessionUser) {
        res.status(404).json({message: 'User not found'})
        return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const currentUser = await db.collection('users').findOne({
        email: sessionUser,
    })

    const allDoneTodos = currentUser.doneTodos;

    res.status(201).json({doneTodos: allDoneTodos});
    await client.close();
}

export default getDoneTodos;