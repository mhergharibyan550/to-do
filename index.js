require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const jsonParser = express.json({ extended: true });

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_DB_URI;

app.use(jsonParser);
app.use("/api/auth", require("./routes/auth.route.js"));
app.use("/api/tasks", require("./routes/todo.route.js"));

async function start() {
  try {
    await mongoose.connect(URI);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}

start();
