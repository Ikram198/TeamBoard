import { create_note , get_note_by_id , get_all_notes , delete_note } from '../controllers/note.controllers.js'
import {notes_middleware , notes_access_middleware} from '../middleware/notes.middleware.js'

import express from 'express';

const router = express.Router()

router.post('/create_note/:project',notes_middleware, create_note)

router.post('/get_note/:project',notes_middleware, get_note_by_id)

router.post('/all_project_notes/:project',notes_middleware, get_project_notes)

router.post('/all_notes',notes_middleware, get_all_notes)

router.post('/delete_note/:project',notes_middleware, delete_note)


export default router
