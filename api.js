const sdk = require("api")("@prodia/v1.3.0#be019b2kls0gqss3");
require("dotenv").config();

const auth = process.env.PRODIA_API_KEY;
const createImage = (prompt,style) => {
  sdk.auth(auth);
  
  return new Promise((resolve, reject) => {
    sdk
      .generate({
        prompt: prompt,
        style_preset: style
      })
      .then(({ data }) => {
        resolve(data.job);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const checkImage = (jobId) => {
  sdk.auth(auth);
  return sdk
    .getJob({ jobId })
    .then(({ data }) => data)
    .catch((err) => console.error(err));
};

module.exports = {
  createImage,
  checkImage,
};
