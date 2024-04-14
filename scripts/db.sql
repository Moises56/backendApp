CREATE DATABASE IF NOT EXISTS tasksdb;

USE tasksdb;

CREATE TABLE IF NOT EXISTS tasks (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description) VALUES
('Task 1', 'Description 1'),
('Task 2', 'Description 2'),
('Task 3', 'Description 3');


CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (name, email, password) VALUES
('MouGrind', ' mougrind@gmail.com', 'password1'),
('Estefany', ' estefany@gmail.com', 'password2'),
('Theockles', ' theockles@gmail.com', 'password3');

CREATE TABLE todos(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO todos (title, user_id) VALUES
('Todo 1', 1),
('Todo 2', 1),
('Todo 3', 2);


CREATE TABLE shared_todos(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    todo_id INT NOT NULL,
    user_id INT NOT NULL,
    shareD_with_id INT NOT NULL,
    FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE
);

-- insertar datos en la tabla shared_todos
INSERT INTO shared_todos (todo_id, user_id, shared_with_id) VALUES
(1, 1, 2),
(2, 1, 3),
(3, 2, 1);


-- obtener todos los todos compartidos por el id del usuario
SELECT todos.*, shared_todos.shared_with_id FROM todos
LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
WHERE todos.user_id = 2 OR shared_todos.shared_with_id = 2;
 

