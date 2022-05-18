require("dotenv").config();
const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/proctormedb",
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  saltRounds: process.env.SALTROUNDS || 12,
  smtpPort: process.env.SMTP_PORT || 587,
  authPrefix: process.env.AUTH_HEADER_PREFIX || "BEARER",
  mailServer: process.env.MAIL_SERVER || "smtp.eu.mailgun.org",
  storageBucket: process.env.BUCKET_URL,
};

module.exports = config;
