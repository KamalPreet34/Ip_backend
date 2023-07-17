const express = require('express');
const {Router} =express

const userRouter = Router();
const Usermodel= require('../models/user.model')
// igytfdsdfghkgjhhhhhhjftifttutftuf
const { validateIP, getIPInfo } = require('./iproute');
const { addUserSearch } = require('../controller/userSearchesController');
const { authMiddleware } = require('../authenticator/authMiddleware');
// jdhsgdfghjgfhjgfnd
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {authMiddlewar} = require("../authenticator/auth")
const {blacklist} = require("../blacklist")

require("dotenv").config()

// const app = express()

// app.use(express.json())

userRouter.post('/signup', async (req, res) => {
  try {
    const {name,email, password} = req.body;

    
    const userExists = await Usermodel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const hashed_password =await bcrypt.hash(password, 8)
    const user = new Usermodel({name,email, password : hashed_password});
    await user.save();

    res.json({ message: 'User created successfully' });
  } catch (error) {
    res.send("something went wrong");
  }
});

userRouter.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
     
      const user = await Usermodel.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
     
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    
      res.json({msg:"login successfull", token});
    } catch (error) {
      console.log(error)
    }
  });
  

userRouter.get("/logout", authMiddlewar, (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]
  
  blacklist.push(token)
  res.send("logout successfull")
})




// sgdkhlji;lktfgyjukhjghjcgfhjbk,hmnvbmbcvgyvvcgfcjgcyj
userRouter.post('/search:ipAddress', authMiddleware, validateIP, getIPInfo, addUserSearch);

module.exports= userRouter