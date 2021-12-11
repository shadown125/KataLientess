import {connectToDatabase} from "../../../lib/db";
import {getSession} from "next-auth/react";

async function getAllTodos(req, res) {
    const session = await getSession({
        req: req,
    })

    if (!session.user.email) {
        res.status(404).json({message: 'User not found'})
        return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const currentUser = await db.collection('users').findOne({
        email: session.user.email,
    })

    const allTodos = currentUser.todos;

    res.status(201).json({todos: allTodos});
    await client.close();
}

export default getAllTodos;