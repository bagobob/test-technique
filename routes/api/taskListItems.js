const { Router } =require('express')
const TaskListItem = require('../../models/TaskListItem')

const router = Router()

router.get('/', async(req, res) => {
    try {
        const taskListItems = await TaskListItem.find()
        if(!taskListItems) throw new Error('No taskListItems')
        const sorted = taskListItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)   
    } catch (error) {
        res.status(500).json({message: error.message})
    } 
})

router.post('/', async(req, res) => {
    const newTaskListItem = new TaskListItem(req.body)
    try {
        const taskListItem = await newTaskListItem.save()
        if(!taskListItem) throw new Error('Something went wrong saving the taskListItem')
        res.status(200).json(taskListItem) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await TaskListItem.findByIdAndUpdate(id, req.body)
        if(!response) throw Error('Something went wrong')
        const updated = { ...response._doc, ...req.body}
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.delete('/:id', async(req, res) => {
    const { id } = req.params
    try {
        const remove = await TaskListItem.findByIdAndRemove(id, req.body)
        if(!response) throw Error('Something went wrong')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router