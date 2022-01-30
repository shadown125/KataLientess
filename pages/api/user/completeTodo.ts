import {connectToDatabase} from "../../../lib/db";
import {getSession} from "next-auth/react";
import {ObjectId} from "mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';

async function completeTodo (req: NextApiRequest, res: NextApiResponse) {
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
        email: session!.user!.email,
    });

    if (!user) {
        res.status(404).json({
            message: 'User not found.',
        })
        await client.close();
        return;
    }

    const todos = user.todos.filter((element: ObjectId) => {
        return (element.id.toString() === todoId)
    });

    const [ todosData ] = todos;

    await usersCollection.updateOne({
        email: session!.user!.email,
    }, {
        $push: {
            doneTodos: {
                id: todosData.id,
                title: todosData.title,
                description: todosData.description,
            }
        }
    })

    await usersCollection.updateOne({
        email: session!.user!.email,
    }, {
        $pull: {
            "todos": {
                id: new ObjectId(todoId)
            }
        }
    });

    await client.close();
    res.status(200).json({
        message: "Congrats you complete todo",
    })
}

export default completeTodo;