const redis = require('redis');
const { promisify } = require('util');
require('dotenv').config();


const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});
const redisClient = redis.createClient({ url: process.env.REDIS_URL });
client.on('error', (error) => {
  console.error('Redis error:', error);
});

const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.SETEX).bind(client);




module.exports = {
  client,
  getAsync,
  setexAsync
};