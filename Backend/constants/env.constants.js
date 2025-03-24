const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  API_ENV: {
    PORT: process.env.PORT,
  },
  DB_ENV: {
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    DB_PASSWORD: process.env.DB_PASSWORD,
  },
  JWT_ENV: {
    SECRET: process.env.JWT_SECRET,
    TIME: process.env.JWT_TIME,
    RESET_TIME: process.env.JWT_RESET_TIME,
  },
  CLIENT_ENV: {
    URL: process.env.CLIENT_URL,
  },
  EMAIL_ENV: {
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
};
