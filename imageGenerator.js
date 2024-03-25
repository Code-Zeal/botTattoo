const  {HfInference}  = require("@huggingface/inference")
require('dotenv').config()
const hf = new HfInference(process.env.HFKEY)
async function bufferImage(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer
}
const ImageGeneratorLogic =async (phrase,style) => {
  
  const response = await hf.textToImage({
    inputs: phrase,
    model: 'artificialguybr/doodle-redmond-doodle-hand-drawing-style-lora-for-sd-xl',
    parameters: {
      negative_prompt: 'blurry',
      
    }
  })
  return await bufferImage(response)
};


module.exports= { ImageGeneratorLogic

} 