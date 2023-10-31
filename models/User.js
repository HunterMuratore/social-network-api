const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator(val) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(val);
            },
            message() {
                return 'You must enter a valid email address'
            }
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    virtuals: {
        friendCount: {
            get() {
                return this.friends.length;
            }
        }
    },
    toJSON: {
        virtuals: true
    }
});

const User = model('User', userSchema);

module.exports = User;