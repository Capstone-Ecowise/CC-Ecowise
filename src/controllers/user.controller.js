const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { bucket } = require("../helpers/gcs");
const { v4: uuidv4 } = require("uuid");

const uploadFileToBucket = (fileBuffer, destination) => {
  const blob = bucket.file(destination);
  const stream = blob.createWriteStream({
    resumable: false,
  });

  return new Promise((resolve, reject) => {
    stream.on("finish", () =>
      resolve(`https://storage.googleapis.com/${bucket.name}/${destination}`)
    );
    stream.on("error", reject);
    stream.end(fileBuffer);
  });
};

const UserController = {
  updateProfile: async (req, res) => {
    if (!req.decodedToken) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    const { username: decodedUsername } = req.decodedToken;
    const { username, password } = req.body;
    let profilUrl;

    try {
      const currentUser = await User.findUnique(decodedUsername);

      if (!currentUser) {
        return res
          .status(404)
          .json({ status: "error", message: "User not found" });
      }

      if (req.file) {
        const uniqueId = uuidv4();
        const destination = `${decodedUsername}/profile-${uniqueId}.jpg`;

        if (currentUser.profil) {
          const oldFile = bucket.file(
            currentUser.profil.split(`${bucket.name}/`)[1]
          );
          try {
            await oldFile.delete({ ignoreNotFound: true });
          } catch (err) {
            console.error("Failed to delete existing file:", err.message);
            return res
              .status(500)
              .json({
                status: "error",
                message: "Failed to delete existing profile picture",
              });
          }
        }

        try {
          profilUrl = await uploadFileToBucket(req.file.buffer, destination);
        } catch (err) {
          console.error("Failed to upload new profile picture:", err.message);
          return res
            .status(500)
            .json({
              status: "error",
              message: "Failed to upload new profile picture",
            });
        }
      }

      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const data = {};
      if (username) data.username = username;
      if (password) data.password = hashedPassword;
      if (profilUrl) data.profil = profilUrl;

      const updatedUser = await User.update(decodedUsername, data);

      res
        .status(200)
        .json({
          status: "success",
          message: "Profile updated successfully",
          data: updatedUser,
        });
    } catch (error) {
      console.error("Error updating profile:", error.message);
      res
        .status(500)
        .json({
          status: "error",
          message: "Internal server error",
          error: error.message,
        });
    }
  },

  get: async (req, res) => {
    try {
      const user = await User.get(req);

      if (!user) {
        return res
          .status(404)
          .json({ status: "error", message: "User not found" });
      }

      return res.status(200).json({ status: "success", data: user });
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

  getAllUsersOrderedByPoints: async (req, res) => {
    try {
      const users = await User.getAllUsersOrderedByPoints();
      return res.status(200).json({ status: "success", data: users });
    } catch (error) {
      console.error("Error fetching users ordered by points:", error.message);
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

module.exports = UserController;
