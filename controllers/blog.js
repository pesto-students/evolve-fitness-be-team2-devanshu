const Blog = require("../models/blog");

//  Get All Blog Controllers
exports.getAllBlogs = async (req, res) => {
  const blogsData = await Blog.find({});
  res.json({
    blogsData,
  });
};

// Create Blog Controller
exports.createBlog = (req, res) => {
   let blog = new Blog({
     title: {
       type: String,
       required: true,
     },
     shortSDescription: {
       type: String,
       required: true,
     },
     description: {
       type: String,
       required: true,
     },
     featuredImageUrl: {
       type: Array,
     },
   });
  //save to the DB
  Blog.save((err, product) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        error: "Saving Product in DB failed",
      });
    }
    res.json(product);
  });
};

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
