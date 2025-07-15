import express from 'express';
import { getPlaces, insertPlace } from '../controllers/placesController.js';
const router = express.Router();

router.get('/', getPlaces);
router.post('/', insertPlace);

export default router;
