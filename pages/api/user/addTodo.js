import {connectToDatabase} from "../../../lib/db";
import {ObjectId} from "mongodb";
import {getSession} from "next-auth/react";

async function addTodoHandler (req, res) {
    if (req.method !== 'POST') {
        return;
    }
    const data = req.body;

    const { email, title, description } = data;

    if (!email) {
        res.status(404).json({message: 'User not found'})
        return;
    }

    const session = await getSession({req: req});

    if (!session) {
        res.status(401).json({message: 'Not authenticated!'});
        return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    await db.collection('users').updateOne({email: email}, {
        $push: {"todos": {
                id: new ObjectId(), title: title, description: description
            }}
    });

    res.status(201).json({message: 'Todo created!'});
    await client.close();
}

export default addTodoHandler;