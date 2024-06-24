const Comment = require('../model/commetModel')
// NPM TO CORRECT THE SPELLING------
const SpellCorrector = require('spelling-corrector');
const spellCorrector = new SpellCorrector()
// you need to do this step only one time to load the Dictionary
spellCorrector.loadDictionary();

// STATEMENT NPM TO ANALYAIS THE COMMENT 
const Sentiment = require('sentiment');
const sentiment = new Sentiment();


//API TO FETCH DATA FROM FRONT AND ANALYSIS THE SENTIMENTAL OF THE COMMENT
const sendimentalAnalysis = async (req,res) =>{
    try {
        if(req.body.comment.trim()){
     
         const result = sentiment.analyze(spellCorrector.correct(req.body.comment));
         let value
         if(result.score > 0 ){
           value = "Positive"
         }else if (result.score < 0 ){
           value = 'Negative'
         }else{
           value = "Neutral"
         }
     
         // save to data base----
           const commentData = Comment({
           comment:req.body.comment,
           sentimentalValue : value 
     
         }) 
         commentData.save()
         return res.status(200).send({ message:result.score, success: true })
     
        }else{
         return res.status(200).send({ message:"please enter something...!", success: true })
     
        }
         } catch (error) {
         console.error(error);
         return res.status(401).send({ message: error, success: false })
       }
}


const getChartData = async (req,res) =>{
  try {
    // const sendimentalValue = await Comment.find({},{sentimentalValue:1,_id:0})
    const [positive,negative,neutral] = await Promise.all([
      Comment.countDocuments({sentimentalValue:"Positive"}),
      Comment.countDocuments({sentimentalValue:"Negative"}),
      Comment.countDocuments({sentimentalValue:"Neutral"})
    ])
  return res.status(200).send({message:"fetch sendimentalValue ",success:true,value:{positive,negative,neutral}})
    
  } catch (error) {
    console.error(error);
    return res.status(401).send({message:error,success:false})
  }
}
// fetch data to the table
const getTableData = async (req,res)=>{
  try {
       const data = await Comment.find({}).sort({_id:-1})
       return res.status(200).send({message:"fetch data to the table successfully",success:true,value:data})
  } catch (error) {
    console.error(error);
    return res.status(401).send({message:error,success:false})
  }
}

module.exports = {
    sendimentalAnalysis,
    getChartData,
    getTableData
}