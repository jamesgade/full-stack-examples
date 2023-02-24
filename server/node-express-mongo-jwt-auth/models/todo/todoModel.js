const mongoose = require('mongoose');

const todoScheme = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    todo: {
        type: String,
        required: [true, 'Please provide a todo']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    completed: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Todo', todoScheme);
