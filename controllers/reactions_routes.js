const router = require('express').Router();

const Thought = require('../models/Thought');

// Create a reaction to a thought
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
    const thoughtId = req.params.thoughtId;

    try {
        const thought = await Thought.findById(thoughtId);

        if (!thought) {
            return res.status(404).send({ message: 'Thought not found' });
        }

        thought.reactions.push(req.body);
        await thought.save();


        res.send(thought);

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Delete a reaction from a thought
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    const thoughtId = req.params.thoughtId;
    const reactionId = req.params.reactionId;

    try {
        const thought = await Thought.findById(thoughtId);

        if (!thought) {
            return res.status(404).send({ message: 'Thought not found' });
        }

        const reactionIndex = thought.reactions.findIndex(reaction => reaction._id == reactionId);

        if (reactionIndex === -1) {
            return res.status(404).send({ message: 'Reaction not found in the thought\'s reaction list' });
        }

        thought.reactions.splice(reactionIndex, 1);
        await thought.save();

        res.send(thought);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;