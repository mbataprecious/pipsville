import nc from 'next-connect';
import { attachProfileById } from '../../../../controllers/user.controller';
import { uploadPhoto } from '../../../../controllers/picture.controller';
import database from '../../../../middleware/database';
import formidable from '../../../../middleware/formidable';
// import session from '../../../middleware/ironSession';

const handler = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
  attachParams: true,
})
  .use(database)
  .use(formidable)
  .use(attachProfileById)
  .post(uploadPhoto);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
