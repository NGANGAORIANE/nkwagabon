import express from 'express';
import { getEvenements, insertEvenement } from '../controllers/evenementsController.js';
const router = express.Router();

router.get('/', getEvenements);
router.post('/', insertEvenement);

export default router;
