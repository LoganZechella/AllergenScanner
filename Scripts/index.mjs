import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri =
    "mongodb+srv://jlz01:4bSmzrpzJQd6f@allergenscanner.9wgxnhj.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
    try {
        const database = client.db('allergenscanner');
        const users = database.collection('users');

        // Query for a movie that has the title 'Back to the Future'
        const query = { id: '001' };
        const user = await users.findOne(query);

        console.log(user);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);