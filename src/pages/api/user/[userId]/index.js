import response from '../../../../apiUtil/reponses';
import nc from 'next-connect';
import User from '../../../../models/user.model';

const handler = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end('internal server error');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('route is not found');
  },
  attachParams: true,
})
  .get(getUserById)
  .post(updateUser)
  .delete(deleteUser);

export default handler;

const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).select(['-password', '-createdAt', '-updatedAt', '-isVerified']).exec();
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
  const { userId } = req.params;
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
  const { userId } = req.params;
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
