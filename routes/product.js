const express = require("express");
const router = express.Router();
const { upload } = require("../UplodeImage");

const {
  getProductById,
  createProduct,
  getProductByFitnessType,
  getProduct,
  //   updateProduct,
  //   deleteProduct,
  getAllProducts,
} = require("../controllers/product");
// const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
// const { getUserById } = require("../controllers/user");

//all of params
// router.param("userId", getUserById);
// router.param("productId", getProductById);

//all of actual routes

//create route
router.post(
  "/product/create",
  //   isSignedIn,
  //   isAuthenticated,
  //   isAdmin,
  upload.array("featuredImageUrl"),
  createProduct
);

// fitness type route
router.get("/product/fitnessType/:id", getProductByFitnessType);
// product details by id routes

router.get("/product/:id", getProductById);
// router.get("/product/photo/:productId", photo);

//delete route
// router.delete(
//   "/product/:productId/:userId",
//   isSignedIn,
//   isAuthenticated,
//   isAdmin,
//   deleteProduct
// );

//update route
// router.put(
//   "/product/:productId/:userId",
//   isSignedIn,
//   isAuthenticated,
//   isAdmin,
//   updateProduct
// );

//listing route
router.get("/product", getAllProducts);

// router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
