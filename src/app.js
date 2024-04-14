import expresss from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {options} from './swaggerOptions.js';

 
const specs = swaggerJSDoc(options);


// import mongoose from 'mongoose';
import task from './routes/Task.routes.js';
// import todos from './routes/Todos.routes.js';
// import todo from './routes/Todo.routes.js';

// const corsOptions = {
//     origin: "http://localhost:3000",
//     methods: "GET, POST, PUT, DELETE",
//     credentials: true
// };

const app = expresss();

// Settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));



app.use('/api', task);
// app.use('/api', todos);
// app.use('/api', todo);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));


export default app;

