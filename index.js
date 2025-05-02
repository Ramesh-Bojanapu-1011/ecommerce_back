const db_connect = require("./config/dbconnect");
const express = require("express");
const authRouter = require("./routes/authroute");
const productRouter = require("./routes/projuctroute");
const blogRouter = require("./routes/blogroute");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware

const cookie_parser = require("cookie-parser");
const { not_found, error_handler } = require("./middlewares/errorhandler");
const moragan = require("morgan");

/* `require("dotenv").config();` is a statement in Node.js that loads the dotenv module and calls its
`config()` method. This method reads the `.env` file in the root directory of the project and loads
the environment variables defined in that file into the `process.env` object. This allows you to
store configuration variables in a separate file (`.env`) and access them in your Node.js
application without hardcoding them in your code. */
require("dotenv").config();

db_connect();
const app = express();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

// Enable CORS for all origins. In production, replace * with the origins
// that need to be allowed to access your API.
const corsOptions = {
  origin: "*", // Or: ['http://localhost:3000', 'https://example.com']
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

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
