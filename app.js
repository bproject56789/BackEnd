var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const questionsRouter = require("./routes/questions");
const answersRouter = require("./routes/answers");
const reviewsRouter = require("./routes/reviews");
const consultationsRouter = require("./routes/consultation");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://bproject:Compaq12345@cluster0.bkvcx.mongodb.net/ylc?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((_) => console.log("DB connected"))
  .catch((e) => console.log(e));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/questions", questionsRouter);
app.use("/answers", answersRouter);
app.use("/reviews", reviewsRouter);
app.use("/consultations", consultationsRouter);

module.exports = app;
