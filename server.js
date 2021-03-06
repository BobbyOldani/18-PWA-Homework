const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));

// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "/public/index.html"))
// });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});