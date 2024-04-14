import { connect } from "../databases.js";

const pool = await connect();

export async function getTodosByID(id) {
    console.log(id)
    const [rows] = await pool.query(
      `
      SELECT todos.*, shared_todos.shared_with_id
      FROM todos
      LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
      WHERE todos.user_id = ? OR shared_todos.shared_with_id = ?
    `,
      [id, id]
    );
    return rows;
  }