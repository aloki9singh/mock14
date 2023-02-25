const mongoose = require("mongoose");

require("dotenv").config();
mongoose.set("strictQuery", true);
const connection = mongoose.connect(process.env.MONGOOSE_URL);
module.exports = {
  connection
};
