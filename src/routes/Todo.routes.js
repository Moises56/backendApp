import {Router} from 'express';

import {
    getTodosByID

} from '../controllers/Todo.controller.js';

const router = Router();

router.get('/todobyId/:id', async (req, res) => {
    console.log('GET /todobyId/:id');
    const id = req.params.id;
    const todos = await getTodosByID(id);
    res.status(200).send(todos);
});


export default router;

//el 15$ de 35000 es 5250

// 5250 * 12 = 63000

//el 10% de 30000 es 3000 
// 3000 * 12 = 36000 