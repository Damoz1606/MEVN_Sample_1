const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

const { url } = require("./config/database/db.config");

//database
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then((db) => {
    console.log("MongoDB online");
  })
  .catch((err) => {
    console.log(err);
  });

//settings
app.set("port", process.env.PORT || 3000);

//middleware
app.use(morgan("dev"));
app.use(cors("http://localhost:" + app.get("port")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", require("./app/routes/route"));
app.use("/api", require("./app/routes/tutorial"));

//static
app.use(express.static(path.join(__dirname, "public")));

//listeners
app.listen(app.get("port"), () => {
  console.log(`Server on port: ${app.get("port")}`);
});
