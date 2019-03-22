require('dotenv').config();

const config = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/melonbun-test',
  port: process.env.PORT || 3000,
};

export default config;
