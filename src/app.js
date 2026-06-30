import express from 'express';
import auth_router from "./routs/auth.routes.js"
import health_router from "./routs/healthcheck.routes.js"
const app = express();
app.use(express.json());

// Define your routes here
app.get('/', (req, res) => {
  res.send('Welcome to the Kanban Application API!');
});


app.use('/api/v1/authentication', auth_router);
app.use('/api/v1/health', health_router);
app.use('/api/v1/authentication', auth_router);



export default app;
