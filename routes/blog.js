const express = require("express");
const router = express.Router();
const { upload } = require("../UplodeImage");

const { createBlog, BlogById, getAllBlogs } = require("../controllers/blog");
const { route } = require("./product");


// Get All Blogs
route.post("/blog",getAllBlogs)

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
