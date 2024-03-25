const  {HfInference}  = require("@huggingface/inference")
const fs = require("fs")
require('dotenv').config()
const path = require('path');
const filePath = path.resolve(__dirname, 'oldPhrases.txt');
const hf = new HfInference(process.env.HFKEY)
function appendToFile(filePath, text) {
  fs.appendFile(filePath, text + ',', 'utf8', err => {
    if (err) {
      return;
    }
  });
}
const GeneratePhrase = async ()=>{
  try {
  const oldPhrases = await fs.promises.readFile(filePath,"utf8",(err,data)=>{
    if(err){
      return
    }
    return data
  })
    const response = await hf.textGeneration({
      model: 'google/flan-t5-xxl',
      inputs: 'Generate a cool and unique phrase to inspire a tattoo design. It can be unconventional, mysterious, or thought-provoking. This text will be used to create an amazing image through AI-powered generation nvinkpunk. do not include: ' + oldPhrases
    })
    appendToFile(filePath,response.generated_text)
    return "A drawing of" + response.generated_text
} catch (error) {
  console.log(error); 
}
}

module.exports ={
  GeneratePhrase
} 