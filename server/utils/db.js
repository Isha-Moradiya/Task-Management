const { default: mongoose } = require("mongoose");

const uri = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connection Successfull to Database");
  } catch (error) {
    console.error("Database Connection Failed");
    process.exit(0);
  }
};

module.exports = connectDb;
