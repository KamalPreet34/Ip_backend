const axios = require('axios');
const { getAsync, setexAsync } = require('../config/redis');
const logger = require('../logger/logger');

const validateIP = (req, res, next) => {
  let ipAddress = req.params.ipAddress;
  
   ipAddress=ipAddress.split(":")
  console.log(ipAddress[1])
  const ipPattern =  /^([0-9]{1,3}\.){3}[0-9]{1,3}$/
if (!ipPattern.test(ipAddress[1])) {
res.status(400).json({ message: 'Invalid IP address format' });
} else {
next();
}
};

const getIPInfo = async (req, res, next) => {
const ipAddress = req.params.ipAddress;

// check if IP info is already in Redis cache
const ipInfo = await getAsync(ipAddress);
if (ipInfo) {


res.json(JSON.parse(ipInfo));
} else {

try {
const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
const ipInfo = response.data;
await setexAsync(ipAddress, 6 * 60 * 60, JSON.stringify(ipInfo));

res.json(ipInfo);
} catch (error) {

res.status(500).json({ message: 'Error retrieving IP info' });
}
}
};

module.exports = {
validateIP,
getIPInfo
};