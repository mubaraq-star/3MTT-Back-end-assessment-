const User = require("../models/users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Sign up route logic
const signUp = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    // Check if user already exists with the provided email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.Pass_secret
    ).toString();

    const new_User = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await new_User.save();

    // Return success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in sign up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Sign in route logic
const signIn = async (req, res) => {
  try {
    // Extract user credentials from request body
    const { email, password } = req.body;

    // Check if user exists with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the provided password matches the hashed password in the database
    let decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.Pass_secret
    ).toString(CryptoJS.enc.Utf8);

    // Compare the provided password with the decrypted password
    if (decryptedPassword !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    logger.error("Error in sign in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user profile route logic (requires authentication)
const getUserProfile = async (req, res) => {
  try {
    // Fetch user details from database
    const user = await User.findOne(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user profile details
    res.status(200).json({ user });
  } catch (error) {
    logger.error("Error in fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signUp, signIn, getUserProfile };
