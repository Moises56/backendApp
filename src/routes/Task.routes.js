import {Router} from 'express';

import TaskController from '../controllers/Tasks.controller.js';

const router = Router();

/**
 * @swagger
 *  tags:
 *    name: Tasks
 *    description: Tasks endpoints
 */

/**
 * @swagger 
 * /tasks:
 *      get:
 *          summary: Get all tasks
 *          tags: [Tasks]
 */
router.get('/tasks', TaskController.getAllTasks);

/**
 * @swagger
 * /tasks/count:
 *  get:
 *      summary: Get total tasks
 *      tags: [Tasks]
 * 
 */

router.get("/tasks/count", TaskController.getTasksCount);

/**
 * @swagger
 * /tasks:
 *  post:
 *      summary: Create a new task
 *      tags: [Tasks]
 * 
 */
router.post('/tasks', TaskController.createTask);

/**
 * @swagger
 * /tasks/{id}:
 *  get:
 *      summary: Get a task
 *      tags: [Tasks]
 * 
 */
router.get('/tasks/:id', TaskController.getTask);

/**
 * @swagger
 * /tasks/{id}:
 *  put:
 *      summary: Update a task by id
 *      tags: [Tasks]
 * 
 */
router.put('/tasks/:id', TaskController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *  delete:
 *      summary: Delete a task
 *      tags: [Tasks]
 * 
 */
router.delete('/tasks/:id', TaskController.deleteTask);



export default router;

