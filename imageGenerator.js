
const { createImage, checkImage } = require("./api");
const ImageGeneratorLogic = (frase,style) => {
  
  
  return new Promise((resolve, reject) => {
    createImage(frase,style)
      .then((job) => {
        setTimeout(() => {
          checkImage(job)
            .then((data) => {
              resolve({url:data.imageUrl,phrase:frase});
            })
            .catch((err) => {
              reject(err);
            });
        }, 10000);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


module.exports= { ImageGeneratorLogic

} 