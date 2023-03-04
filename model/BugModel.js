const mongoose = require("mongoose");
const bugSchema = mongoose.Schema(
  {
    bug: { type: String, required: true },
    userId: String,
    category: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const BugModel = mongoose.model("Bug", bugSchema);

module.exports = {
  BugModel,
};
