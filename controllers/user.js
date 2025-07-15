const {User} = require("../models/user");

async function handleGetAllUser(req,res){
const allUsers = await User.find({});
   return res.status(200).json(allUsers);
}
async function handlePostUser(req,res){
     const body = req.body;
    if (!body.firstName || !body.email) {
      return res.status(400).json({ msg: "Name or email is missing!" });
    }
    try {
      const result = await User.create({
        firstName: body.firstName.trim(),
        lastName: body.lastName.trim(),
        email: body.email.trim(),
        gender: body.gender.trim(),
        jobTitle: body.jobTitle.trim(),
      });
      console.log(result);

      return res.status(201).json({ status: "user created successfully!" });
    } catch (err) {
      console.error("Error creating user:", err);
      return res.status(500).json({ error: "Something went wrong" });
    }
}

async function handleGetUserById(req,res){
    //to get user from DB
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: "user not found!"})

    return res.status(200).json(user);
}

async function handlePatchUserById(req,res){
    const body = req.body;
    await User.findByIdAndUpdate(req.params.id, {firstName: body.firstName});
    res.status(201).json({status:"Data updates successfully!"})
}
async function handleDeleteUserById(req,res){
  await User.findByIdAndDelete(req.params.id)
    res.status(201).json({status:"user deleted successfully!"
  })   
}

module.exports ={
    handleGetAllUser,
    handleGetUserById,
    handlePostUser,
    handlePatchUserById,
    handleDeleteUserById
}