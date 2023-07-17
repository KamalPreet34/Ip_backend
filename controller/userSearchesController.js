const client = require('../mongoClient');
const logger = require('../logger/logger');

const addUserSearch = async (req, res, next) => {
  const { userId, ipAddress } = req.body;
  const currentTime = new Date();

  try {
    const result = await client.db().collection('userSearches').insertOne({
      userId,
      ipAddress,
      searchTime: currentTime.toISOString()
    });
    logger.info(`Added user search record for user ${userId} and IP address ${ipAddress} with ID ${result.insertedId}`);
    res.status(201).json({ message: 'User search added successfully' });
  } catch (error) {
    logger.error(`Error adding user search record for user ${userId} and IP address ${ipAddress}: ${error.message}`);
    res.status(500).json({ message: 'Error adding user search' });
  }
};

module.exports = {
  addUserSearch
};