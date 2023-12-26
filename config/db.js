const mongoose = require('mongoose')
const MONGODB_URL = process.env.MONGODB_URL

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(MONGODB_URL);
      console.log(
        `Conneted To Mongodb Database ${conn.connection.host}`);
    } catch (error) {
      console.log(`Error in Mongodb ${error}`);
    }
  };
  
module.exports = connectDB;