import response from '../../../../apiUtil/reponses';
import { jwtSign } from '../../../../apiUtil/jwt';
import User from '../../../../models/user.model';
import config from '../../../../config/config';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      getUserById(req, res);
      break;
    case 'POST':
      break;

    default:
      return response(res, 400, 'only get and post is allowed on this route', null);
  }
}

const getUserById = async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findById(userId).select(['-password', '-createdAt', '-updatedAt', '-isVerified']);
    if (!user) {
      return response(res, 404, 'User not found', null);
    } else {
      return response(res, 200, ' User retrieved successfully', user);
    }
  } catch (err) {
    return response(res, 500, 'server error', err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const user_id = req.params.id;

    let fetchedUser = await User.findOne({ _id: user_id });

    if (!fetchedUser) {
      res.status(404).json({
        type: 'failure',
        message: 'User not found',
      });
    }
    fetchedUser = await User.findByIdAndUpdate({ _id: user_id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      type: 'success',
      message: 'User updated Successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      type: 'failure',
      message: 'Internal Server error',
      error: err.message,
    });
  }
};
