const { hashedPassword, comparePassword } = require("../helpers/authHelpers");
const userModel = require("../models/userModel");
const orderModel = require('../models/orderModel')
const JWT = require("jsonwebtoken");

const registerController = async (req, res, next) => {
  try {
    const { name, email, password, phone, address,answer,role } = req.body;
    if (!name) {
      return res.send({ error: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }

    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!answer) {
      return res.send({ message: "answer is required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .staus(400)
        .json({
          success: false,
          message: "Soory already register this email id",
        });
    }
    const hashedPasswords = await hashedPassword(password);
    // save
    const user = new userModel({
      name,
      email,
      password: hashedPasswords,
      phone,
      address,
      answer,
      role
    });
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "sucessfully register", user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server Error" });
  }
};

//POST LOGIN
 const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};


 const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashedPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const userId = req.user._id;

    // Log the user ID for debugging
    console.log("User ID:", userId);

    // Find the user by ID
    const user = await userModel.findById(userId);

    // Check if the user exists
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    // Handle password validation
    if (password && password.length < 6) {
      return res.status(400).json({ error: "Password is required and must be at least 6 characters long" });
    }

    // Hash the password if provided
    const hashedPassword = password ? await hashPassword(password) : undefined;

    // Update the user profile
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    // Send the updated user profile in the response
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    // Log any errors that occur during the update process
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 }); // Sorting by createdAt field in descending order
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Orders",
      error,
    });
  }
};


 const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  getAllOrdersController,
  getOrdersController,
  forgotPasswordController,
  updateProfileController,
  orderStatusController
};
