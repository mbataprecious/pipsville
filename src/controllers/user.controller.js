import response from '../apiUtil/reponses';
import { jwtSign } from '../apiUtil/jwt';
import User from '../models/user.model';
import config from '../config/config';
import sendMail from '../helpers/sendVerificationMail';
import bcrypt from 'bcrypt';
import emailTemplate from '../helpers/emailTemplate';

export const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    return response(res, 200, 'fetched users successfully', allUsers);
  } catch (err) {
    return res.status(500).json({
      type: 'failure',
      message: 'Server Error!',
    });
  }
};

export const createUser = async (req, res) => {
  const userData = req.body;
  //check if user email exist
  // return response(res, 200, 'User with email Already Exist!', userData);

  const fetchedUser = await User.findOne({ email: userData.email });
  if (fetchedUser) {
    return response(res, 400, 'User with email Already Exist!');
  }
  //delete confirm passeord
  delete userData.confirmPassword;
  try {
    const hash = await bcrypt.hash(userData.password, config.saltRounds);
    userData.password = hash;
    //save user
    const user = new User(userData);
    const savedUser = await user.save();
    //create verification token
    const token = await jwtSign({ user: savedUser._id }, config.jwtSecret, { expiresIn: '30 days' });
    let hostname = req.headers.host;
    let verificationLink = `http://${hostname}/verify/${token}`;
    let msg = emailTemplate(userData.firstname, verificationLink);
    const sent = await sendMail(msg, 'Proctorme verification mail', userData.email);
    if (sent) {
      return res.status(200).json({
        type: 'success',
        message: 'Successfully signed up!',
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      type: 'failure',
      message: err.message,
    });
  }
};

export const attachProfileById = async (req, res, next) => {
  const { userId } = req.query;
  console.log(req.query);
  // console.log('this is the userId', userId);
  try {
    const user = await User.findById(userId).select(['-password', '-createdAt', '-updatedAt', '-isVerified']).exec();
    if (!user) {
      return response(res, 404, 'User not found', null);
    } else {
      req.profile = user;
      next();
    }
  } catch (err) {
    return response(res, 500, 'server error', err.message);
  }
};

export const verify = async (req, res) => {
  try {
    //get picture from files
    const { _id } = req.profile;
    await User.findOneAndUpdate({ _id }, { isVerified: true });

    return response(res, 200, 'verification successful', null);
  } catch (err) {
    console.log(err);
    return response(res, 500, err.message, null);
  }
};
