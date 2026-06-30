import {create_task} from "../controllers/task.controller.js"
import express from "express"

const router = express.Router();

router.get('/task', create_task)

export default router 
