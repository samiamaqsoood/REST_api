const  mongoose = require("mongoose")
// connect with mongoDB

async function ConnectMongoDB(url) {
   return mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log("Can't connect to MongoDB!", err);
  });
}

module.exports = {
    ConnectMongoDB,
}