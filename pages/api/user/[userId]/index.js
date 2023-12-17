import nc from 'next-connect';
import {
  getUserById,
  updateUser,
  deleteUser,
  attachProfileById,
  checkUserVerification,
} from '../../../../controllers/user.controller';
import database from '../../../../middleware/database';

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
  .use(database)
  .get(getUserById)
  .use(attachProfileById)
  .delete(deleteUser)
  .use(checkUserVerification)
  .post(updateUser);

export default handler;
