const mongoose = require("mongoose");
const databaseAddr = process.env.DBAddr;
mongoose.connect(databaseAddr).then(() => {
    console.log("Connected To Database.");

  })
  .catch((err) => {
    console.log(`Error in Database - ${err}`);
  });