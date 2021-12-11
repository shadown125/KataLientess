import {connectToDatabase} from "../../../lib/db";

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

    const client = await connectToDatabase();

    const db = client.db();

    await db.collection('users').updateOne({email: email}, {
        $push: {"todos": {
                title: title, description: description
            }}
    });

    res.status(201).json({message: 'Todo created!'});
    await client.close();
}

export default addTodoHandler;