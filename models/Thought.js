const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function(createdAt) {
            return new Date(createdAt).toLocaleDateString('en-US'); // Formats string to MM/DD/YYYY
        }
    }
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function(createdAt) {
            return new Date(createdAt).toLocaleDateString('en-US');
        }
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    virtuals: {
        reactionCount: {
            get() {
                return this.reactions.length;
            }
        }
    },
    toJSON: {
        virtuals: true
    }
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;