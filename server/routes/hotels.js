import express from 'express';
import { createHotel, updateHotel } from '../controller/hotelController.js'

const router = express.Router();

router.post('/', createHotel)

router.put('/:id', updateHotel)

export default router;