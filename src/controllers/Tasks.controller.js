const Task = {}

import { connect } from "../databases.js";

Task.getAllTasks = async (req, res) => {
    //obtener todas las tareas
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM tasks');
    res.json(rows);
}

Task.createTask = async (req, res) => {
    //crear una tarea
    const { title, description } = req.body;
    const conn = await connect();
    const [rows] = await conn.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description]);
    res.json({
        id: rows.insertId,
        title,
        description
    });
}

Task.getTask = async (req, res) => {
    //obtener una tarea
    const { id } = req.params;
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(rows[0]);
}

Task.updateTask = async (req, res) => {
    //actualizar una tarea
    const { id } = req.params;
    const { title, description } = req.body;
    const conn = await connect();
    await conn.query('UPDATE tasks SET title = ?, description = ? WHERE id = ?', [title, description, id]);
    res.json({
        id,
        title,
        description
    });
}

Task.deleteTask = async (req, res) => {
    //eliminar una tarea
    const { id } = req.params;
    const conn = await connect();
    await conn.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.json({
        message: 'Task deleted'
    });
}

Task.getTasksCount = async (req, res) => {
    console.log('getTasksCount');
    //obtener el total de tareas
    const conn = await connect();
    const [rows] = await conn.query('SELECT COUNT(*) FROM tasks');
    console.log('rows: ', rows[0]['COUNT(*)']);
    res.json({
        count: rows[0]['COUNT(*)']
    });
};


export default Task;
