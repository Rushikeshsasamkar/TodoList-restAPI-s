// routes/taskRoutes.js
import express from 'express';
import {
    addTask,
    getTasks,
    changeTaskStatus,
    deleteTask,
    editTask
} from '../controllers/task.js';

import {
    authMiddleware,
    checkTaskListMiddleware,
    checkTaskMiddleware
} from '../middleware/middleware.js';

const router = express.Router();

router.post('/api/tasks/:listId', authMiddleware, checkTaskListMiddleware, addTask);
router.get('/api/tasks/:listId', authMiddleware, checkTaskListMiddleware, getTasks);
router.patch('/api/tasks/status/:taskId', authMiddleware, checkTaskMiddleware, changeTaskStatus);
router.delete('/api/tasks/task/:taskId', authMiddleware, checkTaskMiddleware, deleteTask);
router.patch('/api/tasks/task/:taskId', authMiddleware, checkTaskMiddleware, editTask);

export default router;
