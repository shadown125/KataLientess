import {connectToDatabase} from "../../../lib/db";
import {hashPassword} from "../../../lib/auth";

async function handler (req, res) {
    if (req.method !== 'POST') {
        return;
    }
    const data = req.body;

    const { email, password, firstName, lastName, image } = data;

    if (!email || !email.includes('@') || !password || password.trim().length < 5) {
        res.status(422).json({message: 'Invalid input'})
        return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const existingUser = await db.collection('users').findOne({
        email: email,
    });

    if (existingUser) {
        res.status(422).json({message: 'User exists already!'});
        await client.close();
        return;
    }

    const hashedPassword = await hashPassword(password);

    await db.collection('users').insertOne({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        image: image,
        todos: [],
        doneTodos: []
    });

    res.status(201).json({message: 'Created user!'});
    await client.close();
}

export default handler;