import Hotel from '../models/Hotel.js';
import { createError, responseError, responseSuccess } from '../utils/helper.js'
import {HotelType} from '../constants/index.js';
import Room from '../models/Room.js';

export const createHotel = async(req, res,next) => {
  if (!Object.keys(req.body).length) {
    return res.status(500).json(responseError('Data is required'))
  }

  let type = req.body.type;
  if (!HotelType.includes(type)) {
    next(createError(500, 'Type is invalid'));
    return;
  }

  const newEntity = new Hotel(req.body)
  try {
    const hotel = await newEntity.save();
    res.status(200).json(hotel);
  } catch (error) {
    next(error)
  }
}

/* Update hotel */
export const updateHotel = async(req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
}

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 10000000 },
    }).limit(limit || undefined);

    let results = responseSuccess(hotels, 'Successful');
    return res.status(200).json(results);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async(req, res, next) => {
  let cities = req.query.cities;
  if (!cities) {
    next(createError(500, 'City not found'));
    return;
  }
  cities = cities.split(',');
  try {
    const list = await Promise.all(
      cities.map(city => {
        return Hotel.countDocuments({ city: city })
      })
    )

    let results = cities.reduce((obj, key, index) => ({ ...obj, [key]: list[index] }), {});
    return res.status(200).json(results);
  } catch (err) {
    next(err)
  }
}

export const countByType = async(req, res, next) => {
  try {
    const list = await Promise.all(
      HotelType.map(type => {
        return Hotel.countDocuments({ type: type })
      })
    )

    let results = HotelType.reduce((obj, key, index) => { 
      let item = { type: key, count: list[index] }
      obj.push(item)
      return obj
    }, []);
    return res.status(200).json(results);
  } catch (err) {
    next(err)
  }
}

export const getHotelRooms = async(req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map(room => {
        return Room.findById(room)
      })
    );
    
    let results = responseSuccess(list, 'Get list successfully')
    return res.status(200).json(results);
  } catch (error) {
    next(error)
  }
}