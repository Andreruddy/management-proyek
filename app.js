const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const projectRoutes = require("./src/routes/projectRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();
const moongURL =
  process.env.MONGO_URL || "mongodb://localhost:27017/management-proyek";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(moongURL);
}

app.use(bodyParser.json());

app.use("/projects", projectRoutes);
app.use(taskRoutes);

module.exports = app;
