const express = require("express");
const {ConnectMongoDB} = require("./connection")
const {logReqRes} = require("./middlewares")
const userRouter = require("./routes/user")

const app = express();
const PORT = 8080;

//step 1 - connection with DB
ConnectMongoDB("mongodb://127.0.0.1:27017/RESTapiPractice");

// step 2 - middlewares
// middleware-plugin to get data send by cient (in form format) in body
app.use(express.urlencoded({ extended: false }));
// app.use(express.json()); // ✅ REQUIRED to parse JSON bodies

//log data
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users", userRouter)



app.listen(PORT, (err) => {
  if (err) {
    console.log("Can't listen to port", PORT);
  } else {
    console.log("Server is listening to port", PORT);
  }
});