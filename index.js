const db_connect = require("./config/dbconnect");
const express = require("express")
const app = express()
const PORT =process.env.PORT||4000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
app.get("/",(req,res)=>{
    res.json("hello world")
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))


db_connect