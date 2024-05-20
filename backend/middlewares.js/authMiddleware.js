const userModel = require("../models/userModel");

const jwt = require('jsonwebtoken');

const requireSignIn = async (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decoded; // Passing decoded token to the request object
        next(); // Call next middleware or route handler
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Sorry, authentication middleware failed" });
    }
};


const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
          return res.status(401).send({
            success: false,
            message: "UnAuthorized Access",
          });
        } else {
          next();
        }
      } catch (error) {
        console.log(error);
        res.status(401).send({
          success: false,
          error,
          message: "Error in admin middelware",
        });
      }
    };


module.exports = {
    requireSignIn,
    isAdmin
};
