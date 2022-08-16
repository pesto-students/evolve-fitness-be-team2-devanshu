const Product = require("../models/product");
const formidable = require("formidable");

const _ = require("lodash");
const { s3Uploadv2, s3Uploadv3 } = require("../s3Config");

// const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.split("/")[0] === "image") {
//     cb(null, true);
//   } else {
//     cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 1000000000, files: 3 },
// });

// CREATE controllers
exports.createProduct = async (req, res) => {
  const { name, description, category, address, price, fitnessType } = req.body;
  const results = await s3Uploadv2(req.files);
  let imageUrl = results.map((item) => {
    return item.Location;
  });
  let product = new Product({
    name: name,
    description: description,
    category: category,
    address: address,
    price: price,
    featuredImageUrl: imageUrl,
    fitnessType: fitnessType,
  });
  //save to the DB
  product.save((err, product) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        error: "Saving Product in DB failed",
      });
    }
    res.json(product);
  });
};

// ProductByFitnessType controllers

exports.getProductByFitnessType = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.find({ fitnessType: id });
    res.json({
      product,
    });
  } catch (error) {
    console.log("there is an error in your DB");
  }
};
// product by controllers
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.find({ _id: id });
    res.json({
      product,
    });
  } catch (error) {
    console.log("there is an error in your DB", error);
  }
};
// delete controllers
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product",
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedProduct,
    });
  });
};

// Todo Update controllers
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    //updation code
    let product = req.product;
    product = _.extend(product, fields);

    //handle file here
    if (file.featuredImageUrl) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      try {
        const results = await s3Uploadv2(req.files);
        console.log(results);
        return res.json({ status: "success" });
      } catch (err) {
        console.log(err);
      }
    }
    // console.log(product);

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Updation of product failed",
        });
      }
      res.json(product);
    });
  });

  res.json({ results: req.body });
};

// All Product Controller
exports.getAllProducts = async (req, res) => {
  const ProductData = await Product.find({});
  res.json({
    ProductData,
  });
};
