const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    comment:{
         type:String,
         require:true
    },
    sentimentalValue:{
        type:String,
        require:true,
    }

},{
    timestamps:true
})


module.exports = mongoose.model("comment",commentSchema)
