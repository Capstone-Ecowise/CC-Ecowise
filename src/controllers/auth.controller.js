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
          .json({ message: "Username/email and password are required!" });
      }

      const data = await User.getByUsername(identifier);
      const user = data[0];

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Password is incorrect!" });
      }

      const token = await jwt.sign(
        {
          username: user.username,
        },
        process.env.SECRET_KEY,
        {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400,
        }
      );

      res.status(200).json({
        token: token,
        username: user.username,
        name: user.name,
        status: user.status,
        points: user.points,
      });
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  logout: async (req, res) => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized - Missing Token" });
    }

    const decodedToken = jwt.verify(
      token.split(" ")[1],
      process.env.SECRET_KEY
    );

    if (!decodedToken || !decodedToken.username) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    try {
      req.session.destroy();

      res.status(201).json({ message: "Logout success!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  register: async (req, res) => {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    try {
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      const usernameRegex = /^[a-zA-Z0-9]+$/;
      if (!usernameRegex.test(username)) {
        return res.status(400).json({
          message: "Username can only contain letters and numbers!",
        });
      }

      const existingUsername = await prisma.user.findFirst({
        where: { username: username },
      });

      if (existingUsername) {
        return res.status(400).json({ message: "Username already exists!" });
      }

      const existingEmail = await prisma.user.findFirst({
        where: { email: email },
      });

      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists!" });
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
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = AuthController;
