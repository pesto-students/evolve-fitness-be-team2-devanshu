const express = require("express");
const router = express.Router();
const { upload } = require("../UplodeImage");

const {
  getProductById,
  createProduct,
  getProductByFitnessType,
  updateProduct,
  //   deleteProduct,
  getAllProducts,
  getProductByOwnerId,
  createReview,
  getProductByCity,
} = require("../controllers/product");
const { isAuthenticated, isAdmin } = require("../controllers/auth");

//all of actual routes

//create route
router.post(
  "/product/create/:id",
  isAuthenticated,
  // isAdmin,
  upload.array("featuredImageUrl"),
  createProduct
);

// fitness type route
router.get(
  "/product/fitnessType/:city/:id",
  isAuthenticated,
  getProductByFitnessType
);

// update route
router.put(
  "/product/:productId/:id",
  isAuthenticated,
  isAdmin,
  upload.array("featuredImageUrl"),
  updateProduct
);

// product rating
router.patch("/product/review/:id", isAuthenticated, createReview);

// product details by id routes
router.get("/product/:id", isAuthenticated, getProductById);

// product by owner id
router.get("/product/owner/:id", isAdmin, isAuthenticated, getProductByOwnerId);

// product by city name
router.get("/product/city/:id", isAuthenticated, getProductByCity);

//delete route
// router.delete(
//   "/product/:productId/:userId",
//   isSignedIn,
//   isAuthenticated,
//   isAdmin,
//   deleteProduct
// );

//listing route
router.get("/product", isAuthenticated, getAllProducts);

// router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
