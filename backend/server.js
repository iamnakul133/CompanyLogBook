//import
import express, { json } from "express";
import mongoose from "mongoose";
import users from "./database/admin.js";
import projects from "./database/projects.js";
import cors from "cors";
import session from "express-session";
import flash from "connect-flash";

//middleware
const app = express();
const port = 5000;
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(
  session({
    secret: "geeksforgeeks",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(flash());

//database connection
mongoose.promise = global.Promise;
const dburl =
  "mongodb+srv://Admin:nN4TLdW5Bnf4zGR@cluster0.ocekt.mongodb.net/logbookdb?retryWrites=true&w=majority";
mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
mongoose.set("debug", true);
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected");
});

//api routes
app.get("/", (req, res) => {
  res.status(200).send({ message: "hello world" });
});

app.post("/login", async (req, res) => {
  try {
    var Email = req.body.email;
    users.findOne({ Email }, function (err, adventure) {
      if (err) {
        return res.send(err);
      }
      if (!adventure) {
        res.send({ status: "failed", message: "user not found" });
      }
      if (req.body.password === adventure.password) {
        res.send({ status: "success!!", message: "user logged in" });
      } else {
        res.send({ status: "failed", message: "Invalid Password" });
      }
    });
  } catch {}
});

app.post("/signup", (req, res) => {
  try {
    var newuser = new users();
    newuser.email = req.body.email;
    newuser.password = req.body.password;
    newuser.save();
    res.send(newuser);
  } catch {}
});
app.get("/dashboard", async (req, res) => {
  try {
    var dashboardDetails = {
      registered: Number,
      closed: Number,
      cancelled: Number,
      running: Number,
      QualityRegistered: Number,
      QualityCompleted: Number,
      MaintenanceRegistered: Number,
      MaintenanceCompleted: Number,
      HRRegistered: Number,
      HRCompleted: Number,
      FinanceRegistered: Number,
      FinanceCompleted: Number,
      StrategyRegistered: Number,
      StrategyCompleted: Number,
      StoresRegistered: Number,
      StoresCompleted: Number,
      QualityCancel: Number,
      MaintenanceCancel: Number,
      HRCancel: Number,
      FinanceCancel: Number,
      StrategyCancel: Number,
      StoresCancel: Number,
      closerDelay: Number,
    };
    let today = new Date().toISOString().slice(0, 10);
    dashboardDetails.closerDelay = await projects
      .find({
        $and: [{ end: { $lt: today } }, { status: "running" }],
      })
      .count();

    // var data = await projects.aggregate([
    //   {
    //     $group: {
    //       Registered: {
    //         $sum: 1,
    //       },
    //     },
    //   },
    // ]);
    // console.log(data);
    dashboardDetails.registered = await projects.find().count();
    dashboardDetails.closed = await projects.find({ status: "closed" }).count();
    dashboardDetails.cancelled = await projects
      .find({ status: "cancelled" })
      .count();
    dashboardDetails.running = await projects
      .find({ status: "running" })
      .count();

    dashboardDetails.QualityCancel = await projects
      .find({ Department: "Quality", status: "cancelled" })
      .count();
    dashboardDetails.QualityRegistered = await projects
      .find({ Department: "Quality" })
      .count();
    dashboardDetails.QualityCompleted = await projects
      .find({
        Department: "Quality",
        status: "closed",
      })
      .count();

    dashboardDetails.MaintenanceCancel = await projects
      .find({ Department: "Maintenance", status: "cancelled" })
      .count();
    dashboardDetails.MaintenanceRegistered = await projects
      .find({ Department: "Maintenance" })
      .count();
    dashboardDetails.MaintenanceCompleted = await projects
      .find({
        Department: "Maintenance",
        status: "closed",
      })
      .count();

    dashboardDetails.HRCancel = await projects
      .find({ Department: "HR", status: "cancelled" })
      .count();
    dashboardDetails.HRRegistered = await projects
      .find({ Department: "HR" })
      .count();
    dashboardDetails.HRCompleted = await projects
      .find({
        Department: "HR",
        status: "closed",
      })
      .count();

    dashboardDetails.StrategyCancel = await projects
      .find({ Department: "Strategy", status: "cancelled" })
      .count();
    dashboardDetails.StrategyRegistered = await projects
      .find({ Department: "Strategy" })
      .count();
    dashboardDetails.StrategyCompleted = await projects
      .find({
        Department: "Strategy",
        status: "closed",
      })
      .count();

    dashboardDetails.StoresCancel = await projects
      .find({ Department: "Stores", status: "cancelled" })
      .count();
    dashboardDetails.StoresRegistered = await projects
      .find({ Department: "Stores" })
      .count();
    dashboardDetails.StoresCompleted = await projects
      .find({
        Department: "Stores",
        status: "closed",
      })
      .count();

    dashboardDetails.FinanceCancel = await projects
      .find({ Department: "Finance", status: "cancelled" })
      .count();
    dashboardDetails.FinanceRegistered = await projects
      .find({ Department: "Finance" })
      .count();
    dashboardDetails.FinanceCompleted = await projects
      .find({
        Department: "Finance",
        status: "closed",
      })
      .count();
    console.log(dashboardDetails);
    res.send(dashboardDetails);
  } catch (error) {}
});

app.put("/update/:id", async (req, res) => {
  const data = await projects.findOneAndUpdate(
    { _id: req.params.id },
    { status: req.body.status }
  );
  data.status = req.body.status;
});

app.post("/newproject", async (req, res) => {
  var newproject = new projects({
    Theme: req.body.Theme,
    Reason: req.body.Reason,
    Category: req.body.Category,
    type1: req.body.type1,
    Division: req.body.Division,
    Priority: req.body.Priority,
    Department: req.body.Department,
    Location: req.body.Location,
    start: req.body.start.substring(0, 10),
    end: req.body.end.substring(0, 10),
    status: "registered",
  });
  try {
    await newproject.save();
    res.send(newproject);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/projects", async (req, res) => {
  try {
    var data = await projects.find();
    res.send(data);
  } catch (error) {}
});

//listner
app.listen(port, () => console.log("Listening on localhost:" + port));
