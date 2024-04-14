import {Router} from 'express';

import TodoCtrl from '../controllers/Todos.controller.js';

const router = Router();

router.get('/todos', TodoCtrl.getAllTodos);
router.post('/todos', TodoCtrl.createTodo);

//obtener todos los todosbyId
router.get('/todos/:id', TodoCtrl.getTodoByUserId);
//obtener un todo por id
router.get('/todos/todo/:id', TodoCtrl.getTodoId);
//obtener todos los getSharedTodoById
router.get('/todos/shared/:id', TodoCtrl.getSharedTodoById);

//getUserById
router.get('/users/:id', TodoCtrl.getUserById);
//getUserByEmail
router.post('/users/email', TodoCtrl.getEmail);

//crear un todo
router.post('/newtodo', TodoCtrl.createTodo);
//delete todo
router.delete('/todos/:id', TodoCtrl.deleteTodo);
//toggleCompleted
router.put('/todos', TodoCtrl.toggleCompleted);
// sharetodo Compartir un todo con otro usuario
router.post('/todos/share', TodoCtrl.shareTodo);


export default router;
