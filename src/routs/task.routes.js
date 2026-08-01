import {create_task} from "../controllers/task.controllers.js"
import {task_middleware} from "../middleware/task.middleware.js"

import express from "express"

const router = express.Router();

router.get('/task', task_middleware , create_task)

export default router 
