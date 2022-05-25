import response from '../../../../apiUtil/reponses';

import User from '../../../../models/user.model';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await getUserById(req, res);
      break;
    case 'POST':
      await updateUser(req, res);
      break;
    case 'DELETE':
      await updateUser(req, res);
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
  const { userId } = req.query;
  try {
    let fetchedUser = await User.findOne({ _id: userId });

    if (!fetchedUser) {
      res.status(404).json({
        type: 'failure',
        message: 'User not found',
      });
    }
    fetchedUser = await User.findByIdAndUpdate({ _id: userId }, req.body, {
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

const deleteUser = async (req, res) => {
  const { userId } = req.query;
  try {
    let fetchedUser = await User.findOne({ _id: userId });

    if (!fetchedUser) {
      return res.status(404).json({
        type: 'failure',
        message: 'User not found',
      });
    } else {
      const deletedUser = await User.deleteOne({ _id: userId });

      if (deleteUser) {
        response(res, 200, 'user deleted successfully', null);
      }
    }
  } catch (err) {
    response(res);
    res.status(500).json({
      type: 'failure',
      message: 'Internal Server error',
      error: err.message,
    });
  }
};
