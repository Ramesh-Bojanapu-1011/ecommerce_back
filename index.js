const db_connect = require("./config/dbconnect");
const express = require("express");
const authRouter = require("./routes/authroute");
const productRouter = require("./routes/projuctroute");
const blogRouter = require("./routes/blogroute");
const bodyParser = require("body-parser");

const cookie_parser = require("cookie-parser");
const { not_found, error_handler } = require("./middlewares/errorhandler");
const moragan = require("morgan");

db_connect()
const app = express();

const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

app.use(moragan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookie_parser());

/* setting up routes in the Express application. */
app.use("/api/user/", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

/* are setting up middleware functions in the Express application. */
app.use(not_found);
app.use(error_handler);
