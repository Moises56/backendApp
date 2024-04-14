import dotenv from "dotenv";
dotenv.config();

export const pool = {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'tasksdb'
}


export const PORT = process.env.PORT || 3000;