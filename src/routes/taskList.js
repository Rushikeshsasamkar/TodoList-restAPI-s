// imports 
import express from 'express';
import TaskList from '../models/taskList.js';
import { authMiddleware, checkTaskListMiddleware } from '../middleware/middleware.js';
import User from '../models/user.js';

// express router
const taskListRouter = express.Router();

// create task list
taskListRouter.post('/api/tasks', authMiddleware, async (req, res) => {

    try {

        const taskList = new TaskList({
            ...req.body,
            owner: req.user._id
        });

        await taskList.save();
        res.status(200).send({
            message: 'task list saved succesfully',
            id: taskList._id
        });

    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error.message });
    }

});

//add list of lists
// taskListRouter.post('/api/lists', authMiddleware, async (req, res) => {

//     try {

//         req.body.forEach(async (list) => {
//             const taskList = new TaskList({
//                 ...list,
//                 owner: req.user._id
//             });

//             await taskList.save();
//         });

//         res.status(200).send({ message: 'List of lists saved succesfully' });

//     } catch (error) {
//         console.error(error);
//         res.status(400).send({ message: error.message });
//     }

// });

taskListRouter.post('/api/lists', authMiddleware, async (req, res) => {
    try {
        await Promise.all(req.body.map(async (list) => {
            const taskList = new TaskList({
                ...list,
                owner: req.user._id
            });
            await taskList.save();
        }));

        res.status(200).send({ message: 'List of lists saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error.message });
    }
});



// get all task lists of a user
taskListRouter.get('/api/tasks', authMiddleware, async (req, res) => {

    try {

        // get user from authentication middleware
        const user = await User.findById(req.user._id);

        // use the virtual data(task lists) of user
        await user.populate('taskLists');
        res.status(200).send(user.taskLists.map(task => {
            return {
                _id: task._id,
                title: task.title,
                description: task.description
            }
        }));

    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error.message });
    }

});

// remove a task list and all of tasks in it
taskListRouter.delete('/api/tasks/:listId', authMiddleware, checkTaskListMiddleware, async (req, res) => {

    try {

        // ** tasks are deleted in middleware function of model
        // delete the task and return it
        const taskList =
            await TaskList.findOne({ _id: req.params.listId, owner: req.user._id });
        console.log(`Deleting tasks for list: ${taskList._id}`);


        const deletedList = await taskList.remove();
        if (!deletedList) return res.status(404).send({ message: 'Task list not found' });
        res.status(200).send({
            message: 'Task list deleted succesfully',
            deletedList
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }

});

// edit task list
taskListRouter.patch('/api/tasks/:listId', authMiddleware, checkTaskListMiddleware, async (req, res) => {
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => ['title', 'description'].includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ message: 'Invalid updates' })
    }

    try {
        const taskList = await TaskList.findOne({ _id: req.params.listId, owner: req.user._id });

        if (!taskList) {
            return res.status(404).send({ message: 'Task list not found' });
        }

        updates.forEach((update) => taskList[update] = req.body[update]);
        await taskList.save();
        res.status(200).send({
            message: 'Task list edited succesfully',
            list: {
                _id: taskList._id,
                title: taskList.title,
                description: taskList.description
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});

export default taskListRouter;

