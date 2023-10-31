const router = require('express').Router();

const User = require('../models/User');

// Get all of a User's friends
router.get('/users/:userId/friends', async (req, res) => {
    const user_id = req.params.userId;

    try {
        const user = await User.findById(user_id).populate('friends');

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const friends = user.friends;
        res.send(friends);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Add a friend to a User
router.post('/users/:userId/friends/:friendId', async (req, res) => {
    const user_id = req.params.userId;
    const friend_id = req.params.friendId;

    try {
        const user = await User.findById(user_id);
        const friend = await User.findById(friend_id);

        if (!user || !friend) {
            return res.status(404).send({ message: 'User or friend not found' });
        }

        user.friends.push(friend);
        await user.save();

        res.send(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// delete a friend from a User
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
    const user_id = req.params.userId;
    const friend_id = req.params.friendId;

    try {
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const friendIndex = user.friends.indexOf(friend_id);

        if (friendIndex === -1) {
            return res.status(404).send({ message: 'Friend not found in the user\'s friends list' });
        }

        user.friends.splice(friendIndex, 1);
        await user.save();

        res.send(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


module.exports = router;
