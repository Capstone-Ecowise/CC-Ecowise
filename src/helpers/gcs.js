const { Storage } = require("@google-cloud/storage");
const path = require("path");

const storage = new Storage({
  keyFilename: path.join(__dirname, "../../capstone-ecowise-a475c60120e8.json"),
});
const bucketName = "ecowise-profile-user";
const bucket = storage.bucket(bucketName);

module.exports = { bucket };
