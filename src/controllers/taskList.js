// controllers/taskListController.js
import TaskList from '../models/taskList.js';
import User from '../models/user.js';

export const createTaskList = async (req, res) => {
    try {
        const taskList = new TaskList({
            ...req.body,
            owner: req.user._id
        });

        await taskList.save();
        res.status(200).send({
            message: 'Task list saved successfully',
            id: taskList._id
        });

    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error.message });
    }
};

export const createMultipleTaskLists = async (req, res) => {
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
};

export const getTaskLists = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        await user.populate('taskLists');

        res.status(200).send(user.taskLists.map(task => ({
            _id: task._id,
            title: task.title,
            description: task.description
        })));

    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error.message });
    }
};

export const deleteTaskList = async (req, res) => {
    try {
        const taskList = await TaskList.findOne({ _id: req.params.listId, owner: req.user._id });

        if (!taskList) return res.status(404).send({ message: 'Task list not found' });

        const deletedList = await taskList.remove();

        res.status(200).send({
            message: 'Task list deleted successfully',
            deletedList
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
};

export const editTaskList = async (req, res) => {
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => ['title', 'description'].includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ message: 'Invalid updates' });
    }

    try {
        const taskList = await TaskList.findOne({ _id: req.params.listId, owner: req.user._id });

        if (!taskList) {
            return res.status(404).send({ message: 'Task list not found' });
        }

        updates.forEach(update => taskList[update] = req.body[update]);
        await taskList.save();

        res.status(200).send({
            message: 'Task list edited successfully',
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
};
