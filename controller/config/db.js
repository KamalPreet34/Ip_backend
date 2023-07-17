const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const connection = mongoose.connect(uri, {
  useNewUrlParser: true
}).then((result) => {
    console.log('connected to mongodb')
}).catch((err) => {
    console.log(err.message)
});





module.exports=connection