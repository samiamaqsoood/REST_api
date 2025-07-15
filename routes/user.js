const express = require("express");
const {handleGetAllUser,
    handleGetUserById,
    handlePostUser,
    handlePatchUserById,
    handleDeleteUserById} = reuire("../controllers/user")
const router =  express.Router;

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