const winston = require('winston');
const mongoTransport = require('winston-mongodb').MongoDB;
require('dotenv').config();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new mongoTransport({
      level: 'error',
      db: process.env.MONGO_URI,
      options: { useUnifiedTopology: true }
    })
  ]
});

module.exports = logger;