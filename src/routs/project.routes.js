import create_project from '../controllers/project.controllers.js'
import express from 'express';

const router = express.Router()

router.get('/projects', All_projects)

router.get('/create_project', create_project)

router.get('/:project', project)

export default router
