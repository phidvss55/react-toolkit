import bcrypt from "bcryptjs";
import User from '../models/User.js';
import { createError, responseSuccess } from "../utils/helper.js";
import jwt from 'jsonwebtoken';

export const register = async(req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt)

    const user = new User({
      ...req.body,
      password: hash,
    })

    await user.save();

    res.status(200).send(responseSuccess(user, "User has been created.")); 
  } catch(err) {
    next(err);
  }
}

export const login = async(req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const paired = await bcrypt.compare(req.body.password, user.password)
    if (!paired) {
      return next(createError(404, "Wrong credentials!"));
    }

    // generate token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      { expiresIn: '1h' }
    )

    const { password, isAdmin, ...others } = user._doc;
    res.cookie('access_token', token, { httpOnly: true }).status(200).json(responseSuccess({ details: { ...others }, isAdmin }, 'Successfully'));
  } catch (err) {
    next(err)
  }
}