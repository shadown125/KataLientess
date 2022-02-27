import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
    const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.${process.env.MONGODB_CLUSTER_IDENTIFIER}.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
    return await MongoClient.connect(connectionString);
}