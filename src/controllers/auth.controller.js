import bcrypt from 'bcrypt';
import User from '../models/user.model';
import response from '../apiUtil/reponses';

export const login = async (req, res) => {
  try {
    const { email } = req.body;
    // validate all the fields
    if (!email || !req.body.password) {
      return res.status(400).json({
        type: 'failure',
        message: 'Invalid email or password',
      });
    }

    const fetchedUser = await User.findOne({ email }).lean();
    // verify email
    if (!fetchedUser) {
      return res.status(401).json({
        type: 'failure',
        message: 'Invalid Credentials!',
      });
    } else {
      // check if password match
      const isPasswordMatch = await bcrypt.compare(req.body.password, fetchedUser.password);
      if (!isPasswordMatch) {
        response(res, 401, 'Invalid Credentials!');
        return res.status(401).json({
          type: 'failure',
          message: 'Invalid Credentials!',
        });
      }

      //checking if is not user is verified
      if (!fetchedUser.isVerified) {
        return response(res, 401, 'user is not verified check mail for verification or call support');
      }

      const { password, ...user } = fetchedUser;
      //setting session when user is verified
      req.session.user = user;
      await req.session.save();
      console.log(req.session);

      return response(res, 200, ' User retrieved successfully', user);
    }
  } catch (err) {
    console.log(err);
    return response(res, 500, 'server error', err.message);
  }
};
