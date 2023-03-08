const express=require("express")
const app=new express()
const MovieInfo=require('./model/movieDB')
const path=require("path")



app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(express.static(path.join(__dirname,'/build')))
//cors

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})
app.get("/",function(req,res){
    res.send("server is up")
    })

    app.post("/api/create",function(req,res){

        try{
            
    console.log(req.body)
    let movie=new MovieInfo(req.body)//passing to db
    //saving to db
    movie.save()
    res.send("Data Added")
        }
        catch(error){
            res.status(500).send(error)    
        }
})


app.get("/api/view",async function(req,res){
    try{
       let result= await MovieInfo.find()
       res.json(result)
    }
    catch(error){
        res.status(500).send(error)
    }
})



app.post("/api/update",async function(req,res){

    try{
       let result= await MovieInfo.findByIdAndUpdate(req.body._id,req.body)
       res.send("data updated")
    }
    catch(error){
        res.status(500).send(error)
    }
})
app.post("/api/delete",async function(req,res){
    try{
        await MovieInfo.findByIdAndDelete(req.body._id)
        res.send("data deleted")
    }
    catch(error){
        res.status(500).send(error)
    }
})



app.post("/api/search",async function(req,res){
    try{
       let result= await MovieInfo.find(req.body)
       res.json(result)
    }
    catch(error){
        res.status(500).send(error)
    }
})

app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname,'/build/index.html'))
})

app.listen(8000,()=>{
    console.log("server is running port no 8000")
    })