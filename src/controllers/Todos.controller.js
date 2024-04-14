const TodoCtrl = {}

import { connect } from "../databases.js";


//obtener todas los todos de la tabla todos
TodoCtrl.getAllTodos = async (req, res) => {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM todos');
    res.json(rows);
}

//obtener todos los todosbyId
TodoCtrl.getTodoByUserId = async (req, res) => {
    const pool = await connect();
    const [rows] = await pool.query(
        `
            SELECT todos.*, shared_todos.shared_with_id FROM todos
            LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
            WHERE todos.user_id = ? OR shared_todos.shared_with_id = ?;
        `
        , [req.params.id, req.params.id]);
    return rows;
}

//obtener un todo por id 
TodoCtrl.getTodoId = async (req, res) => {
    const pool = await connect();
    const [rows] = await pool.query(
        `
            SELECT * FROM todos WHERE id = ?;
        `
        , [req.params.id]);
    res.json(rows[0]);
}


//obtener todos los getSharedTodoById
TodoCtrl.getSharedTodoById = async (req, res) => {
    const pool = await connect();
    const [rows] = await pool.query(
        `
            SELECT * from shared_todos WHERE todo_id = ?;
        `
        , [req.params.id]);
    res.json(rows);
}

//getUserById
TodoCtrl.getUserById = async (req, res) => {
    const pool = await connect();
    const [rows] = await pool.query(
        `
            SELECT * from users WHERE id = ?;
        `
        , [req.params.id]);
    res.json(rows[0]);
}

//getUserByEmail
TodoCtrl.getEmail = async (req, res) => {
    const pool = await connect();
    const [rows] = await pool.query(
        `
            SELECT * from users WHERE email = ?;
        `
        , [req.body.email]);
    res.json(rows[0]);
}

//crear un nuevo todo user_id, title
TodoCtrl.createTodo = async (req, res) => {
    const conn = await connect();
    const [result] = await conn.query('INSERT INTO todos (user_id, title) VALUES (?, ?)', [req.body.user_id, req.body.title]);
    res.json({
        id: result.insertId,
        ...req.body
    });
}

//actualizar un todo por su id
TodoCtrl.updateTodo = async (req, res) => {
    const conn = await connect();
    await conn.query('UPDATE todos SET title = ?, description = ? WHERE id = ?', [req.body.title, req.body.description, req.params.id]);
    res.json({
        id: req.params.id,
        ...req.body
    });
}

//eliminar un todo por su id
TodoCtrl.deleteTodo = async (req, res) => {
    console.log(req.params.id);
    const conn = await connect();
    await conn.query('DELETE FROM todos WHERE id = ?', [req.params.id]);
    res.json({ message: 'Todo eliminado' });
}

//toggleCompleted change the value of completed
TodoCtrl.toggleCompleted = async (req, res) => {
    const newValue = req.body.value === true ? "TRUE" : "FALSE";
    const conn = await connect();
    const [result] = await conn.query(
    `
        UPDATE todos 
        SET completed = ${newValue}
        WHERE id = ?
    `, [req.body.id]);
    res.json(result);
}

//sharetodo Compartir un todo con otro usuario
TodoCtrl.shareTodo = async (req, res) => {
    const conn = await connect();
    await conn.query(
        `
            INSERT INTO shared_todos (todo_id, user_id shared_with_id) VALUES (?, ?, ?);
        `
        , [req.body.todo_id, req.body.user_id, req.body.shared_with_id]);
    res.json({
        todo_id: req.body.todo_id,
        user_id: req.body.user_id,
        shared_with_id: req.body.shared_with_id
    });

}






export default TodoCtrl;