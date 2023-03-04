const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");

const { authenticate } = require("./Middleware/authenticate.middleware");
const { router } = require("./routes/Bug.router");
const { userRouter } = require("./Routes/User.route");

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Bug App");
});

app.use("/api", userRouter);
app.use(authenticate);
app.use("/api",router)
app.listen(process.env.PORT, async (req, res) => {
  try {
    await connection;
    console.log("Server Connected to database");
  } catch (err) {
    console.log({ err: err });
  }
  console.log(`Server Running On Port ${process.env.PORT}`);
});
