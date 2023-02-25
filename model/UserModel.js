const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please Enter Your Name"] },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
    },
    password: { type: String, required: [true, "Please Enter Your Password"] },
    bio: { type: String, required: [true, "Please Enter Your Bio"] },
    phone: { type: Number, required: [true, "Please Enter Your Phone"] },
    image: { type: String, required: [true, "Please Enter Your Image"] },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = {
  UserModel
}
