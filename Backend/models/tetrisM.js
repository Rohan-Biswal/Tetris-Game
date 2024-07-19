const mongoose=require("mongoose");
const tetrisSchema= new mongoose.Schema({
    playerName:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true
    },
    level:{
        type:Number,
        required:true
    }
})
const tetrisModel=mongoose.model("tetris",tetrisSchema);
module.exports=tetrisModel;