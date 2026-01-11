const express = require('express')
const router = express.Router()
const { protectUser, } = require('../middlewate/auth')
const { Login } = require('../controller/login')
const { getTasks,createTask,updateTask,deleteTask } = require('../controller/task')

router.post('/auth', Login)
router.get('/get-tasks', protectUser, getTasks)
router.post('/add-task', protectUser, createTask)
router.put('/update-task/:id', protectUser, updateTask)
router.delete('/delete-task/:id', protectUser, deleteTask)


module.exports = router
