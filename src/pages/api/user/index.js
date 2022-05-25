import response from '../../../apiUtil/reponses';
import { jwtSign } from '../../../apiUtil/jwt';
import User from '../../../models/user.model';
import config from '../../../config/config';
import sendMail from '../../../helpers/sendVerificationMail';
import bcrypt from 'bcrypt';
import emailTemplate from '../../../helpers/emailTemplate';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      getUsers(req, res);
      break;
    case 'POST':
      await createUser(req, res);
      break;

    default:
      return response(res, 400, 'only get and post is allowed on this route', null);
  }
}

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    response(res, 200, 'fetched users successfully', allUsers);
  } catch (err) {
    return res.status(500).json({
      type: 'failure',
      message: 'Server Error!',
    });
  }
};

const createUser = async (req, res) => {
  const userData = req.body;
  //check if user email exist
  const fetchedUser = await User.findOne({ email: userData.email });
  if (fetchedUser) {
    return response(res, 400, 'User with email Already Exist!');
  }
  //check if user phone exist
  const storedUser = await User.findOne({ phone: userData.phone });

  if (storedUser) {
    return response(res, 400, 'User with phone Already Exist!');
  }
  //delete confirm passeord
  delete userData.confirmPassword;
  try {
    const hash = await bcrypt.hash(userData.password, config.saltRounds);
    userData.password = hash;
    //save user
    const user = new User(userData);
    await user.save();
    //create verification token
    const token = await jwtSign({ user: userData }, config.jwtSecret, { expiresIn: 60 * 2 });
    let hostname = req.headers.host;
    let verificationLink = `http://${hostname}/verify/${token}`;
    let msg = emailTemplate(userData.firstname, verificationLink);
    const sent = await sendMail(msg, 'Proctorme verification mail', userData.email);
    if (sent) {
      return res.status(200).json({
        type: 'success',
        message: 'Successfully signed up!',
      });
    } else {
      return res.status(500).json({
        type: 'failure',
        message: 'Mail not sent',
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.message);
    return res.status(500).json({
      type: 'failure',
      message: 'Server Error!',
    });
  }
};
