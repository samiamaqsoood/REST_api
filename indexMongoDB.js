const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8080;

// middleware-plugin to get data send by cient (in form format) in body
app.use(express.urlencoded({ extended: false }));
// app.use(express.json()); // ✅ REQUIRED to parse JSON bodies


// connect with mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/RESTapiPractice")
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log("Can't connect to MongoDB!", err);
  });
//schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
  },
},
 {timestamps : true}
);

// model
const User = mongoose.model("user", userSchema);

app
  .route("/users")
  .get(async (req, res) => {
    //to get all users from DB
    const allUsers = await User.find({});
    const html = `<ul>
    ${allUsers.map((user)=> `<li>${user.firstName} - ${user.lastName}</li>`)}
    </ul>`
    res.send(html);
  })
app
  .route("/api/users")
  .get(async (req, res) => {
    //to get all users from DB
    const allUsers = await User.find({});
    res.status(200).json(allUsers)
  })
  .post(async (req, res) => {
    const body = req.body;
    if (!body.firstName || !body.email) {
      return res.status(400).json({ msg: "Name or email is missing!" });
    }
    try {
      const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle,
      });
      console.log(result);

      return res.status(201).json({ status: "user created successfully!" });
    } catch (err) {
      console.error("Error creating user:", err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  })

  app
  .route("/api/users/:id")
  .get(async (req, res) => {
    //to get all users from DB
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: "user not found!"})

    return res.status(200).json(user);
  })
  .patch(async (req, res) => {
    const body = req.body;
    await User.findByIdAndUpdate(req.params.id, {firstName: body.firstName});
    res.status(201).json({status:"Data updates successfully!"})
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.status(201).json({status:"user deleted successfully!"
  })
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Can't listen to port", PORT);
  } else {
    console.log("Server is listening to port", PORT);
  }
});
