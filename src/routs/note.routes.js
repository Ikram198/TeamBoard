import create_note from '../controllers/note.controllers.js'
import express from 'express';

const router = express.Router()

router.get('/note', create_note)


export default router