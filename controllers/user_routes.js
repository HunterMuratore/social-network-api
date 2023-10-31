const router = require('express').Router();

const User = require('../models/User');

// Get all Users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();

        res.send(users);
    } catch (err) {
        console.log(err.message);
        res.status(404).send({ message: err.message });
    }
});


// Get a single user by id and populate thought and friend data
router.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        res.send(user);
    } catch (err) {
        console.log(err.message);
        res.status(404).send({ message: err.message });
    }
});

// Post a new User
router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.send(user);

    } catch (err) {
        console.log(err.message);
        res.status(401).send({ message: err.message });
    }
});

// Update a User by id
router.put('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Delete a User by id
router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;