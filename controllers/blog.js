const Blog = require("../models/blog");

//  Get All Blog Controllers
exports.getAllBlogs = async (req, res) => {
  const blogsData = await Blog.find({});
  res.json({
    blogsData,
  });
};

// Create Blog Controller
exports.createBlog = (req, res) => {};

//  Get  Blog  By Id Controller
exports.BlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.find({ _id: id });
    res.json({
      blog,
    });
  } catch (error) {
    console.log("there is an error in your DB", error);
  }
};

//  Todo delete Blog Controller
