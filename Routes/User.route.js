const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/UserModel");
const userRouter = express.Router();
require("dotenv").config();

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (err) {
    console.log({ err: err });
    res.send({ err: err });
  }
});

userRouter.get("/getProfile/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById({ _id: id })
    res.status(200).json({
      success: true,
      User: user,
    });
  } catch (err) {
    console.log({ err: err });
    res.send({ success: false, err: err });
  }
});
userRouter.post("/register", async (req, res) => {
  const { name, email, password,bio,phone,image } = req.body;

  try {
    const salt = 6;
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ name, email, password: hash ,bio,phone,image});
        await user.save();

        res.status(201).json({
          success: true,
          msg: "Registation Successful",
        });
      }
    });
  } catch (error) {
    console.log({ err: err });
    res.send({
      success: false,
      error: error,
      msg: "Registation Failed",
    });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = 6;

    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.KEY);

          res.status(201).json({
            success: true,
            msg: "Login Successful",
            token: token,
          });
          console.log({
            msg: "Login Successful",
            token: token,
          });
        } else {
          res.send({
            success: false,
            msg: "Error While Logging User",
            err: err,
          });
          console.log({
            msg: "Login Failed",
            err: err,
          });
        }
      });
    }
  } catch (error) {
    console.log({ err: err });
    res.send({
      success: false,
      error: error,
      msg: "Login Failed",
    });
  }
});


userRouter.patch("/users/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const user = await UserModel.findById({ _id: id });
  // const userID = user[0].userID;
  // const userreqID = req.body.userID;
 
  try {
    // if (userID !== userreqID) {
    //   res.send({ success: false, err: "You are not Authorized" });
    // } else {
      const user = await UserModel.findByIdAndUpdate({ _id: id }, payload);
      res.status(204).json({
        success: true,
        msg: "Successfully Updated the user",
        users: user,
       });
    // }
  } catch (err) {
    console.log({ err: err, msg: " User Update Error!" });
    res.send({ success: false, msg: " User Update Error!", err: err });
  }
});

module.exports = {
  userRouter,
};
