import express from 'express';
import { getEvents, insertEvents } from '../controllers/eventsController.js';
const router = express.Router();

router.get('/', getEvents);
router.post('/', insertEvents);

export default router;
