import express from 'express';
import { getRestaurants, insertRestaurant } from '../controllers/restaurantsController.js';
const router = express.Router();

router.get('/', getRestaurants);
router.post('/', insertRestaurant);

export default router;
