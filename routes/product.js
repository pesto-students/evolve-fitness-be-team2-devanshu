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
const { isAuthenticated } = require("../controllers/auth");

//all of actual routes

//create route
router.post(
  "/product/create",
  //   isSignedIn,
  isAuthenticated,
  //   isAdmin,
  upload.array("featuredImageUrl"),
  createProduct
);

// fitness type route
router.get(
  "/product/fitnessType/:id",
  isAuthenticated,
  getProductByFitnessType
);
// product details by id routes

router.get("/product/:id", isAuthenticated, getProductById);
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
router.get("/product", isAuthenticated, getAllProducts);

// router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
