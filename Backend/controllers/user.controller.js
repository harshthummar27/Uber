const { validationResult } = require("express-validator");
const userService = require('../services/user.service');
const userModel = require("../models/user.model");

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    // ✅ Hash password first
    const hashedPassword = await userModel.hashPassword(password);

    // ✅ Then create user
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    // ✅ Then generate token
    const token = await user.generateAuthToken();

    res.status(201).json({ token, user });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
