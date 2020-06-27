const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const db = require("./db/db");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

db();

const app = express();

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());

require("./middleware/passport")(passport);

app.use("/", indexRouter);
app.use("/auth/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("pages/error");
});

module.exports = app;
