// routes/taskListRoutes.js
import express from 'express';
import {
    createTaskList,
    createMultipleTaskLists,
    getTaskLists,
    deleteTaskList,
    editTaskList
} from '../controllers/taskList.js';

import { authMiddleware, checkTaskListMiddleware } from '../middleware/middleware.js';

const router = express.Router();

router.post('/api/tasks', authMiddleware, createTaskList);
router.post('/api/lists', authMiddleware, createMultipleTaskLists);
router.get('/api/tasks', authMiddleware, getTaskLists);
router.delete('/api/tasks/:listId', authMiddleware, checkTaskListMiddleware, deleteTaskList);
router.patch('/api/tasks/:listId', authMiddleware, checkTaskListMiddleware, editTaskList);

export default router;
