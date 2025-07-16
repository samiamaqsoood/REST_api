const express = require("express");
const router =  express.Router();

const {handleGetAllUser,
    handleGetUserById,
    handlePostUser,
    handlePatchUserById,
    handleDeleteUserById} = require("../controllers/user")

router
.route("/")
  .get(handleGetAllUser)
  .post(handlePostUser

  )
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handlePatchUserById)
  .delete(handleDeleteUserById);

module.exports = router;