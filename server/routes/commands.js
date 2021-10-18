const express = require("express");
const router = express.Router();
const Command = require("../models/command");
const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validate = require("../validation/commandValidator");

router.get("/", auth, async (req, res) => {
  try {
    const commands = await Command.find();
    res.status(200).json(commands);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/:id", auth, async (req, res) => {
  const command = await Command.findById(req.params.id);
  if (!command)
    return res.status(404).send("The command with the given id is not found");
  res.send(command);
});

router.post("/", auth, async (req, res) => {
  const { error, com } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newcommand = await new Command({ ...com }).save();

  res.send(
    _.pick(newcommand, [
      "_id",
      "creationDate",
      "sendingDate",
      "status",
      "total",
    ])
  );
});

router.delete("/:id", auth, async (req, res) => {
  const command = await Command.findByIdAndRemove(req.params.id);

  if (!command)
    return res.status(404).send("The command with the given ID was not found.");

  res.send(command);
});

router.put("/:id", auth, async (req, res) => {
  const command = await Command.findByIdAndUpdate(
    req.params.id,
    {
      creationDate: req.body.creationDate,
      sendingDate: req.body.sendingDate,
      status: req.body.status,
      total: req.body.total,
    },
    {
      new: true,
    }
  );

  if (!command)
    return res.status(404).send("The command with the given ID was not found.");

  res.send(command);
});

module.exports = router;
