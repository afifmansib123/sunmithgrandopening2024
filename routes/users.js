const User = require("../models/User.js");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
});
router.get("/get-all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post("/add-user", async (req, res) => {
  try {
    const newUser = new User(req.body)
    await newUser.save()
    res.status(200).json("User added successfully")
  } catch (e) {
    res.status(404).json(e)
  }
})

module.exports = router;
