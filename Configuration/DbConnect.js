const mongoose = require("mongoose");

const DBconnect = async () => {
  try {
    await mongoose.connect(process.env.DB_Local);

    console.log("Data base is connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = DBconnect;
