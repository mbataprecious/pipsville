import 'dotenv/config';

const config = {
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/proctormedb',
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  saltRounds: process.env.SALTROUNDS || 12,
  smtpPort: process.env.SMTP_PORT || 587,
  mailServer: process.env.MAIL_SERVER || 'smtp.eu.mailgun.org',
  storageBucket: process.env.BUCKET_URL,
};

export default config;
