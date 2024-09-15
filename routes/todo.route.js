const { Router } = require("express");
const router = Router();
const Todo = require("../models/ToDo");

router.post("/add", async (req, res) => {
  const { text, userId } = req.body;

  try {
    const todo = new Todo({
      text,
      owner: userId,
      completed: false,
      important: false,
    });

    await todo.save();

    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    const todos = await Todo.find({ owner: userId });

    res.json(todos);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const task = await Todo.findOneAndDelete({ _id: req.params.id });
    res.json(task);
  } catch (error) {
    console.log(error);
  }
});

router.put("/complete/:id", async (req, res) => {
  try {
    const task = await Todo.findOne({ _id: req.params.id });
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    console.log(error);
  }
});

router.put("/important/:id", async (req, res) => {
  try {
    const task = await Todo.findOne({ _id: req.params.id });
    task.important = !task.important;
    await task.save();
    res.json(task);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
