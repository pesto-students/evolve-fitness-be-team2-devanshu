const Product = require("../models/product");
const { s3Uploadv3 } = require("../s3Config");

// CREATE controllers
exports.createProduct = async (req, res) => {
  const {
    name,
    description,
    category,
    address,
    price,
    fitnessType,
    gymOwnerId,
  } = req.body;
  const results = await s3Uploadv3(req.files);
  let imageUrl = results.map((item) => {
    return item.Location;
  });
  let product = new Product({
    name: name,
    description: description,
    category: category,
    address: JSON.parse(address),
    price: JSON.parse(price),
    featuredImageUrl: imageUrl,
    fitnessType: fitnessType,
    gymOwnerId: gymOwnerId,
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

//  Update controllers
exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const {
    name,
    description,
    category,
    address,
    price,
    fitnessType,
    gymOwnerId,
  } = req.body;
  const results = await s3Uploadv3(req.files);
  let imageUrl = results.map((item) => {
    return item.Location;
  });
  Product.findByIdAndUpdate(
    { _id: productId },
    {
      $set: {
        name: name,
        description: description,
        category: category,
        address: JSON.parse(address),
        price: JSON.parse(price),
        featuredImageUrl: imageUrl,
        fitnessType: fitnessType,
        gymOwnerId: gymOwnerId,
      },
    },
    (err, product) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "You are not authorized to update this user",
        });
      }
      res.json(product);
    }
  );
};

//  CREATE rating
exports.createReview = (req, res) => {
  const { id } = req.params;
  Product.findOneAndUpdate(
    { _id: id },
    { $push: { reviews: req.body } },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "failed to add review",
        });
      }
      res.json(data.reviews);
    }
  );
};

// ProductByFitnessType controllers
exports.getProductByFitnessType = async (req, res) => {
  const { id, city } = req.params;
  try {
    const product = await Product.find({
      fitnessType: id,
      "address.city": city,
    });
    res.json({
      product,
    });
  } catch (error) {
    console.log("there is an error in your DB");
  }
};

// get product by id
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.find({ _id: id });
    delete product["gymOwnerId"];
    res.json({
      product,
    });
  } catch (error) {
    console.log("there is an error in your DB", error);
  }
};

// get product by owner id
exports.getProductByOwnerId = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.find({ gymOwnerId: id });
    if (product.length === 0) {
      return res.status(201).json({
        error: "data not found",
      });
    } else {
      res.json({
        product,
      });
    }
  } catch (error) {
    console.log("there is an error in your DB", error);
  }
};

// get product by city name
exports.getProductByCity = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.find({ "address.city": id });
    if (product.length === 0) {
      return res.status(404).json({
        error: "data not found",
      });
    } else {
      res.json({
        product,
      });
    }
  } catch (error) {
    console.log("there is an error in your DB", error);
  }
};

// All Product Controller
exports.getAllProducts = async (req, res) => {
  const ProductData = await Product.find({});
  res.json({
    ProductData,
  });
};
