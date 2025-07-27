// imports
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user.js';
import TaskList from '../models/taskList.js';
import Task from '../models/task.js';

//middleware function to check athentication
// const authMiddleware = async (req, res, next) => {
//     try {

//         const token = req.header('Authorization').replace('Bearer ', '');

//         console.log('Raw Authorization Header::Parsed', token);

//         console.log('process.env.JWT_SECRET:: debug', process.env.JWT_SECRET);
        
//         // get user id from jwt
//         const userId = jsonwebtoken.verify(token, process.env.JWT_SECRET);

//         // get user from database and pass user data to request body
//         req.user = await User.findOne({ _id: userId, 'tokens.token': token });
//         next();

//     } catch (error) {
//         console.log(error);
//         res.status(401).send({ message: 'Unauthorized' });
//     }
// }

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) throw new Error('Authorization header missing');

        const token = authHeader.replace('Bearer ', '').trim();

        console.log('Raw Authorization Header::Parsed', token);
        console.log('process.env.JWT_SECRET:: debug', process.env.JWT_SECRET);

        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        
        // decoded should contain _id if you signed JWT like { _id: user._id }
        const user = await User.findById(decoded._id);
        if (!user) throw new Error('User not found');

        // Optional: if you're storing tokens array on user
        // const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ message: 'Unauthorized' });
    }
};






// get tasklist to check if exists and belongs to that user
const checkTaskListMiddleware = async (req, res, next) => {
    try {
        // check if given id is valid
        if (!req.params.listId.match(/^[0-9a-fA-F]{24}$/)) throw new Error('Task list does not exist');

        const taskList = await TaskList.findOne({ _id: req.params.listId });
        if (!taskList) throw new Error('Task list does not exist');

        if (taskList.owner._id.toString() !== req.user._id.toString()) {
            throw new Error('You are not allowed to get this list');
        }

        req.taskList = taskList;

        next();

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
}




//get task to check if exists and belongs to that user
const checkTaskMiddleware = async (req, res, next) => {
    try {
        // check if given id is valid
        if (!req.params.taskId.match(/^[0-9a-fA-F]{24}$/)) throw new Error('Task does not exist');

        const task = await Task.findOne({ _id: req.params.taskId });
        if (!task) throw new Error('Task does not exist');

        if (task.owner._id.toString() !== req.user._id.toString()) {
            throw new Error('You are not allowed to get this task');
        }

        req.task = task;

        next();

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
}



export { authMiddleware, checkTaskListMiddleware, checkTaskMiddleware };