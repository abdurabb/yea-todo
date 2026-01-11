const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is Required']
    },
    description: {
        type: String,
        required: [true, 'description is Required']
    },
    deadline: {
        type: Date,
        required: [true, 'deadline is Required']
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'completed', ]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'userId is Required']
    },
    group:{
        type: String,
        required: [true, 'group is Required']
    },
    priority: {
        type: String,
        required: [true, 'priority is Required']
    },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
