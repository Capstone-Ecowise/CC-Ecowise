const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const validator = require("validator");
const prisma = new PrismaClient();

const AuthController = {
  login: async (req, res, next) => {
    try {
      const { identifier, password } = req.body;

      if (!identifier || !password) {
        return res
          .status(400)
          .json({
            status: "error",
            message: "Username/email and password are required!",
          });
      }

      const data = await User.getByUsername(identifier);
      const user = data[0];

      if (!user) {
        return res
          .status(404)
          .json({ status: "error", message: "User not found!" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ status: "error", message: "Password is incorrect!" });
      }

      const token = await jwt.sign(
        { username: user.username },
        process.env.SECRET_KEY,
        { algorithm: "HS256", allowInsecureKeySizes: true, expiresIn: 86400 }
      );

      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: {
          token: token,
          username: user.username,
          name: user.name,
          status: user.status,
          points: user.points,
        },
      });
      next();
    } catch (error) {
      res
        .status(500)
        .json({
          status: "error",
          message: "Internal server error",
          error: error.message,
        });
    }
  },

  logout: async (req, res) => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ status: "error", message: "Unauthorized - Missing Token" });
    }

    try {
      const decodedToken = jwt.verify(
        token.split(" ")[1],
        process.env.SECRET_KEY
      );

      if (!decodedToken || !decodedToken.username) {
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorized - Invalid Token" });
      }

      req.session.destroy();
      res.status(200).json({ status: "success", message: "Logout successful" });
    } catch (error) {
      res
        .status(500)
        .json({
          status: "error",
          message: "Internal server error",
          error: error.message,
        });
    }
  },

  register: async (req, res) => {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields are required!" });
    }

    try {
      if (!validator.isEmail(email)) {
        return res
          .status(400)
          .json({ status: "error", message: "Invalid email format" });
      }

      const usernameRegex = /^[a-zA-Z0-9]+$/;
      if (!usernameRegex.test(username)) {
        return res
          .status(400)
          .json({
            status: "error",
            message: "Username can only contain letters and numbers!",
          });
      }

      const existingUsername = await prisma.user.findFirst({
        where: { username: username },
      });
      if (existingUsername) {
        return res
          .status(400)
          .json({ status: "error", message: "Username already exists!" });
      }

      const existingEmail = await prisma.user.findFirst({
        where: { email: email },
      });
      if (existingEmail) {
        return res
          .status(400)
          .json({ status: "error", message: "Email already exists!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          username,
          name,
          email,
          password: hashedPassword,
          status: "Seed",
          points: 0,
        },
      });

      const { password: _, ...userWithoutPassword } = newUser;
      return res
        .status(201)
        .json({
          status: "success",
          message: "User registered successfully",
          data: userWithoutPassword,
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          status: "error",
          message: "Internal server error",
          error: error.message,
        });
    }
  },
};

module.exports = AuthController;
