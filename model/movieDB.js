const mongoose=require("mongoose")


mongoose.connect("mongodb+srv://athira:athu@cluster0.pd5fgpc.mongodb.net/?retryWrites=true&w=majority")


const Schema=mongoose.Schema;
var movieSchema=new Schema({
    name:String,
    actor:String,
    actress:String,
    director:String,
    year:Number,
    camera:String,
    producer:String,
    language:String
})

var MovieInfo=mongoose.model("movies",movieSchema)
module.exports=MovieInfo