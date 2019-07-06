const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const { MONGODB } = require('../../config');

// get posts
router.get('/', async (req,res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});


// add post
router.post('/add_post', async (req,res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        title: req.body.title,
        body: req.body.body,
        createdAt: new Date().toISOString()
    });
    res.status(201).send();
});


// TODO: edit post
// delete post
router.delete('/:id', async (req,res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

async function loadPostCollection(){
    const client = await mongodb.MongoClient.connect(
        MONGODB, { useNewUrlParser: true }
    );

    return client.db('vue-express').collection('posts');
}

module.exports = router;