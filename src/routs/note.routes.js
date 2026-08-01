import { create_note } from '../controllers/note.controllers.js'
import {notes_middleware} from '../middleware/notes.middleware.js'

import express from 'express';

const router = express.Router()

router.get('/note',notes_middleware, create_note)


export default router
