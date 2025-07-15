import express from 'express';
import { getEvents, insertEvents } from '../controllers/evenementsController.js';
const router = express.Router();

router.get('/', getEvents);
router.post('/', insertEvents);

export default router;
