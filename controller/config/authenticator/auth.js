const jwt = require('jsonwebtoken');
require("dotenv").config()

const {Usermodel} = require("../models/user.model")

const {blacklist} = require("../blacklist")

const authMiddlewar = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(blacklist.includes(token)){
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken)
    const { userId } = decodedToken;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorized user', err : error.message});
  }
};

module.exports = {authMiddlewar};