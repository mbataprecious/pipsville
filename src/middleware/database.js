import dbConnect from '../utils/dbConnect';

const database = async (_0, _1, next) => {
  try {
    await dbConnect();
  } catch (error) {
    console.log('Database connection error ', error.message);
  }
  next();
};

export default database;
