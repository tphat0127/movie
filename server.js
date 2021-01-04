const express = require("express");
const app = express();
const config = require("./config/index");
const mongoose = require("mongoose");
const movieController = require("./controllers/Movie.controller");
const cinemaController = require("./controllers/Cinema.controller");
const userController = require("./controllers/User.controller");
const userTypeController = require("./controllers/UserType.controller");
const theatreCotroller = require("./controllers/Theatre.controller");
const scheduleController = require("./controllers/Schedule.controller");
const scheduleInforController = require("./controllers/ScheduleInfor.controller");
app.use(express.json());

app.use("/api", movieController);
app.use("/api", cinemaController);
app.use("/api", userController);
app.use("/api", userTypeController);
app.use("/api", theatreCotroller);
app.use("/api", scheduleController);
app.use("/api", scheduleInforController);
app.use("/img", express.static("img"));

console.log("config", config.MONGO_URI);
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect to database successfully");
  })
  .catch(console.log);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
