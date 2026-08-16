import {create_project , all_project , project} from '../controllers/project.controllers.js';
import { projects_middleware , access_project_middleware} from '../middleware/projects.middleware.js';

import express from 'express';
const router = express.Router()

router.post('/projects', projects_middleware , all_project)

router.post('/create_project', projects_middleware ,  create_project)

router.post('/:project', access_project_middleware ,  project)

export default router
