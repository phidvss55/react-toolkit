import express from 'express';
import { countByCity, countByType, createHotel, getHotel, getHotels, updateHotel } from '../controller/hotelController.js'
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyAdmin, createHotel)

router.put('/:id', verifyAdmin, updateHotel)

router.get('/find/:id', getHotel)

router.get('/', getHotels)

router.get('/count-by-city', countByCity)

router.get('/count-by-type', countByType)

export default router;