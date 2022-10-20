const express = require("express");
const router = express.Router();
const { upload } = require("../UplodeImage");
const { createBlog, BlogById, getAllBlogs } = require("../controllers/blog");

// Get All Blogs
router.post("/blog", getAllBlogs);

//  Create Route
router.post(
  "/blog/create",
  //   isSignedIn,
  //   isAuthenticated,
  //   isAdmin,
  upload.array("featuredImageUrl"),
  createBlog
);

// Get By Id Route
router.get("/blog/:id", BlogById);

// Todo dele Route

module.exports = router;