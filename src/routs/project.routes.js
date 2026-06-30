import create_project from '../controllers/project.controllers.js'
import express from 'express';

const router = express.Router()

router.get('/project', create_project)


export default router