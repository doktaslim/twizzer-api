const mongoose = require("mongoose");
const { MONGO_URI } = require("../config/config");

const db = async () => {
  try {
    const dbConn = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useFindAndModify: true,
      useNewUrlParser: true,
    });
    console.log(`Database Connected ${dbConn.connection.host}`);
  } catch (error) {
    console.error("Unable to connect to Database", error);
  }
};

module.exports = db;
