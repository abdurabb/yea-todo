const Task = require('../models/task.js')
const { handleError } = require('../handler/handleError.js')



const getTasks = async (req, res) => {
    try {
        let query = {userId: req.userId}
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const { search, status, group, priority } = req.query
        if (search) {
            query.title = { $regex: search, $options: 'i' }
        }
        if (status) {
            query.status = status
        }
        if (group) {
            query.group = group
        }
        if (priority) {
            query.priority = priority
        }
        const tasks = await Task.find(query).skip((page - 1) * limit).limit(limit)
        const total = await Task.countDocuments(query)
        const totalPages = Math.ceil(total / limit)
        return res.status(200).json({ success: true, message: 'Tasks fetched successfully', tasks, total, totalPages })
    } catch (error) {
        handleError(error, res)
    }
}

const createTask = async (req, res) => {
    try {
        const validationError = validateTask(req, res);
        if (validationError) {
            return res.status(400).json({ success: false, message: validationError })
        }

        const task = await Task.create({ ...req.body, deadline: new Date(req.body.deadline), userId: req.userId, status: 'pending' })
        return res.status(200).json({ success: true, message: 'Task created successfully', task })
    } catch (error) {
        handleError(error, res)
    }
}

const updateTask = async (req, res) => {
    try {
        const { status, group, priority, title, description, deadline } = req.body
        const task = await Task.findById(req.params.id)
        if (!task) {return res.status(404).json({ success: false, message: 'Task not found' }) }
       const statusEnum = ['pending', 'completed', ]
       if(!statusEnum.includes(status)){
        return res.status(400).json({ success: false, message: 'Invalid status' })
       }
        if(status) task.status = status
        if(group) task.group = group
        if(priority) task.priority = priority
        if(title) task.title = title
        if(description) task.description = description
        if(deadline) task.deadline = deadline
        await task.save()
        return res.status(200).json({ success: true, message: 'Task updated successfully', task })
    } catch (error) {
        handleError(error, res)
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {return res.status(404).json({ success: false, message: 'Task not found' }) }
        await task.deleteOne()
        return res.status(200).json({ success: true, message: 'Task deleted successfully' })
    } catch (error) {
        handleError(error, res)
    }
}

module.exports = { getTasks, createTask ,deleteTask,updateTask}



const validateTask = (req, res) => {
    const { title, description, deadline, status, group, priority } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' });
    }
    if (!description) {
        return res.status(400).json({ success: false, message: 'Description is required' });
    }
    if (!deadline) {
        return res.status(400).json({ success: false, message: 'Deadline is required' });
    }
    if (!deadline) {
        return res.status(400).json({ success: false, message: 'Deadline must be a valid date' });
    }
    if (!group) {
        return res.status(400).json({ success: false, message: 'Group is required' });
    }
    if (!priority) {
        return res.status(400).json({ success: false, message: 'Priority is required' });
    }
    return null;
}