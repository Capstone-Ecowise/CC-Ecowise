const { Storage } = require("@google-cloud/storage");
const path = require("path");

const storage = new Storage({
  keyFilename: path.join(__dirname, "../../capstone-ecowise-ae6bb8127610.json"),
});
const bucketName = "ecowise-profile-user";
const bucket = storage.bucket(bucketName);

module.exports = { bucket };
