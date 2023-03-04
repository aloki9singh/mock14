const { Router } = require("express");
const { BugModel } = require("../model/BugModel");

const router = Router();

router.get("/getbugs", async (req, res) => {
  const bugs = await BugModel.find();
  req.send(bugs);
});

router.post("/addbug", async (req, res) => {
  const payload = req.body;
  try {
    const bug = new BugModel(payload);
    await bug.save();
    res.send("New Bug Added");
  } catch (err) {
    console.log({ ERR: err });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await BugModel.findByIdAndDelete({ _id: id });
    req.send(`Bug with id ${id} deleted`);
  } catch (err) {
    console.log({ ERR: err });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;      
  const payload = req.body;
  try {
    await BugModel.findByIdAndUpdate({ _id: id },payload);
    req.send(`Bug with id ${id} Updated`);
  } catch (err) {
    console.log({ ERR: err });
  }
});

module.exports={router}