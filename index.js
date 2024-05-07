const db_connect = require("./config/dbconnect");
const express = require("express");
const authRouter = require("./routes/authroute");
const bodyParser = require("body-parser");
const { not_found, error_handler } = require("./middlewares/errorhandler");

const dotenv=require("dotenv").config()

const app = express()
const PORT =process.env.PORT||4000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use("/api/user/",authRouter);
app.get("/", (_req, res) => {
  res.send("Hello World!");
});


app.use(not_found);
app.use(error_handler)






db_connect()

