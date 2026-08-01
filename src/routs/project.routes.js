import {create_project , all_project , project} from '../controllers/project.controllers.js';
import { projects_middleware , create_project_middleware , access_project_middleware} from '../middleware/projects.middleware.js';

import express from 'express';

const router = express.Router()

router.get('/projects',projects_middleware , all_project)

router.get('/create_project', create_project_middleware ,  create_project)

router.get('/:project', access_project_middleware ,  project)

export default router
