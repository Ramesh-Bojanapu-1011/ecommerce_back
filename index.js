const db_connect = require("./config/dbconnect");
const express = require("express");
const authRouter = require("./routes/authroute");
const bodyParser = require("body-parser");

const dotenv=require("dotenv").config()

const app = express()
const PORT =process.env.PORT||4000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use("/api/user/",authRouter)






db_connect()

