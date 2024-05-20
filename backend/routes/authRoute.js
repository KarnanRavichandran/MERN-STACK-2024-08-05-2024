const express = require("express");
const {
  registerController,
  loginController,
  forgotPasswordController,
  orderStatusController,
  getAllOrdersController,
  updateProfileController,
  getOrdersController,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares.js/authMiddleware");

const authRouter = express.Router();
authRouter.post("/register", registerController);
authRouter.post("/login", loginController);

authRouter.post("/forgot-password", forgotPasswordController);

authRouter.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

authRouter.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
authRouter.put("/profile", requireSignIn, updateProfileController);

authRouter.get("/orders", requireSignIn, getOrdersController);

//all orders
authRouter.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
authRouter.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

module.exports = authRouter;
