const Detail = require("../models/Detail");
const tf = require("@tensorflow/tfjs-node");
const User = require("../models/User");
const loadModel = require("../helpers/loadModel");

const getStatus = (points) => {
  if (points >= 0 && points <= 100) return "Seed";
  if (points >= 110 && points <= 500) return "Sprout";
  if (points >= 510 && points <= 1000) return "Sapling";
  if (points >= 1010 && points <= 5000) return "Tree";
  if (points > 5000) return "Forest_Guardian";
  return "Unknown";
};

const classNames = [
  "Battery",
  "Biological",
  "Cardboard",
  "Clothes",
  "Glass",
  "Metal",
  "Paper",
  "Plastic",
  "Shoes",
  "Trash",
];

let model;

async function initializeModel() {
  try {
    model = await loadModel();
  } catch (error) {
    console.error("Error loading model:", error.message);
  }
}

initializeModel();

const PredictionController = {
  predict: async (req, res) => {
    try {
      if (!model) {
        return res.status(500).json({
          status: "error",
          message: "Model not loaded. Please try again later.",
        });
      }

      if (!req.file || !req.file.buffer) {
        return res.status(400).json({
          status: "error",
          message: "No image file provided. Please upload an image.",
        });
      }

      const imageBuffer = req.file.buffer;
      const image = tf.node.decodeImage(imageBuffer, 3);
      const shape = image.shape;

      if (shape[2] !== 3) {
        return res.status(400).json({
          status: "error",
          message: "Invalid image format. Please upload an RGB image.",
        });
      }

      const tensor = image
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat();

      const prediction = model.predict(tensor);
      const predictionData = await prediction.data();
      const predictedClassIndex = prediction.argMax(-1).dataSync()[0];
      const accuracy = predictionData[predictedClassIndex];

      if (accuracy < 0.5) {
        return res.status(400).json({
          status: "error",
          message: `Prediction accuracy is too low: ${
            Math.floor(accuracy * 100) / 100
          }`,
        });
      }

      const className = classNames[predictedClassIndex];
      const detail = await Detail.findUnique(className);

      if (detail) {
        let userPoints, userStatus;

        if (req.decodedToken) {
          const { username: decodedUsername } = req.decodedToken;
          const user = await User.findUnique(decodedUsername);

          if (user) {
            userPoints = user.points + 50;
            userStatus = getStatus(userPoints);
            await User.update(decodedUsername, {
              points: userPoints,
              status: userStatus,
            });
          }
        }

        res.status(200).json({
          status: "success",
          message: "Prediction successful",
          data: {
            prediction: detail.class_name,
            accuracy: Math.floor(accuracy * 100) / 100,
            description: detail.description,
            tips: detail.tips,
            user: req.decodedToken
              ? { points: userPoints, status: userStatus }
              : null,
          },
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `Details not found for the predicted class: ${className}`,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};

module.exports = PredictionController;
