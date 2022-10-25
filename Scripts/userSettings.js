const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

// MongoDB Client

const mongoclient = new MongoClient('mongodb+srv://jlz01:Df8mVm6FBJOGXqOv@allergenscanner.9wgxnhj.mongodb.net/?retryWrites=true&w=majority');
const db = mongoclient.db('allergenScanner');
const collection = db.collection('users');

// Express Server

const port = 3000;
const app = express();
app.use(express.static('public'));
app.use(express.json());

// Add User
app.post('/user', async (req, res) => {
    await collection.insertOne(req.body);
    res.send(req.body)
});

// Update User
app.put('/user', async (req, res) => {
    req.body._id = ObjectId(req.body._id);
    await collection.findOneAndUpdate({ _id: req.body._id }, { $set: req.body });
    res.status(200).send();
});

// Delete User
app.delete('/user/:_id', async (req, res) => {
    const _id = ObjectId(req.params._id);
    await collection.deleteOne({ _id });
    res.status(200).send({ _id });
});

// Get User
app.get('/user/:_id', async (req, res) => {
    const _id = ObjectId(req.params._id);
    const user = await collection.findOne({ _id });
    res.send(user);
});