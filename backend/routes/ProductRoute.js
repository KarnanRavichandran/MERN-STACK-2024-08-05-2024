const express = require("express");
const productRouter = express.Router();
const formidableMiddleware = require("express-formidable");
const {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  getProductController,
  getSingleProductController,
  productListPageController,
  productFilterController,
  productPhotoController,
  deleteProduct,
  updateProductController,
  productCountController,
  searchProductController,
  productCategoryController,
  realtedProductController,
} = require("../controllers/ProductController");
const { requireSignIn, isAdmin } = require("../middlewares.js/authMiddleware");

productRouter.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidableMiddleware(),
  createProductController
);
productRouter.get(
  "/get-Allproduct",
  requireSignIn,
  isAdmin,
  getProductController
);

productRouter.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidableMiddleware(),
  updateProductController
);

//single product
productRouter.get("/get-product/:slug", getSingleProductController);
productRouter.get("/get-product/:slug", getSingleProductController);
productRouter.get("/product-photo/:pid", productPhotoController);
productRouter.post("/product-filters", productFilterController);
productRouter.get("/product-count", productCountController);
productRouter.get("/product-list/:page", productListPageController);

productRouter.get("/search/:keyword", searchProductController);
productRouter.get("/related-product/:pid/:cid", realtedProductController);
productRouter.delete("/product-delete/:id", deleteProduct);

productRouter.get("/product-category/:slug", productCategoryController);


//payments routes
//token
productRouter.get("/braintree/token", braintreeTokenController);

//payments
productRouter.post("/braintree/payment", requireSignIn, brainTreePaymentController);

module.exports = productRouter;
