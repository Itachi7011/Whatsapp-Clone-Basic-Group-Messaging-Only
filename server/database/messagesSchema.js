const mongoose = require("mongoose");

const whatsappSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  name: {
    type: String,
  },
  timeStamp: {
    type: String,
    default: new Date()
  },
  recieved: {
    type: Boolean,
  },
});
const WhatsappSchema = new mongoose.model("messagecontents", whatsappSchema);
module.exports = WhatsappSchema;
