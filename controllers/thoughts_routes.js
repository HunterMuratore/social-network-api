const router = require('express').Router();

const User = require('../models/User');
const Thought = require('../models/Thought');

// Get all Thoughts
router.get('/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find();

        res.send(thoughts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Get a single Thought by id
router.get('/thoughts/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const thought = await Thought.findById(id);

        if (!thought) {
            return res.status(404).send({ message: 'That thought does not exist' });
        }

        res.send(thought);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Create a new Thought
router.post('/thoughts', async (req, res) => {
    const { thoughtText, username, userId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const thought = await Thought.create({
            thoughtText,
            username,
            userId
        });

        user.thoughts.push(thought._id);
        await user.save();

        res.send(thought);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Update a Thought by id
router.put('/thoughts/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const thought = await Thought.findByIdAndUpdate(id, req.body, { new: true });

        if (!thought) {
            return res.status(404).send({ message: 'Thought not found' });
        }

        res.send(thought);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Delete a Thought by id
router.delete('/thoughts/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const thought = await Thought.findByIdAndDelete(id);

        if (!thought) {
            return res.status(404).send({ message: 'Thought not found' });
        }

        res.send(thought);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;