import express from 'express';
import health_router from "./routs/healthcheck.routes.js"
import auth_router from "./routs/auth.routes.js"
import note_router from "./routs/note.routes.js"
import project_router from "./routs/project.routes.js"
import task_router from "./routs/task.routes.js"
const app = express();
app.use(express.json());

// Define your routes here
app.get('/', (req, res) => {
  res.send('Welcome to the Kanban Application API!');
});


app.use('/api/v1/health', health_router);
app.use('/api/v1/authentication', auth_router);
app.use('/api/v1/authentication', note_router);
app.use('/api/v1/authentication', project_router);
app.use('/api/v1/authentication', task_router);



export default app;
