const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares.js/authMiddleware");
const { createCategoryController, updateCategoryController, getAllCategory, Singlecategory, deleteCategory } = require("../controllers/categoryController");

const categoryRouter = express.Router();

categoryRouter.post("/create-category", requireSignIn,isAdmin,createCategoryController);
categoryRouter.put("/update-category/:id", requireSignIn,isAdmin,updateCategoryController);
categoryRouter.get("/getAll-category", requireSignIn,getAllCategory);
categoryRouter.get("/single-category/:slug", requireSignIn,Singlecategory);
categoryRouter.delete("/delete-category/:id", requireSignIn,isAdmin,deleteCategory);

module.exports = categoryRouter;