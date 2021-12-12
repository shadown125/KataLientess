import {connectToDatabase} from "../../../lib/db";
import {getSession} from "next-auth/react";
import {ObjectId} from "mongodb";

async function deleteDoneTodo (req, res) {
    if (req.method !== 'POST') {
        return;
    }

    const session = await getSession({req: req});

    if (!session) {
        res.status(401).json({message: 'Not authenticated!'});
        return;
    }

    const todoId = req.body.id;

    const client = await connectToDatabase();
    const usersCollection = client.db().collection('users');
    const user = await usersCollection.findOne({
        email: session.user.email,
    });

    if (!user) {
        res.status(404).json({
            message: 'User not found.',
        })
        await client.close();
        return;
    }

    await usersCollection.updateOne({
        email: session.user.email,
    }, {
        $pull: {
            "doneTodos": {
                id: new ObjectId(todoId)
            }
        }
    });

    await client.close();
    res.status(200).json({
        message: "Done todo deleted!",
    })
}

export default deleteDoneTodo;