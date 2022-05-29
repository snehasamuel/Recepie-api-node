const Express=require("express")
const BodyParser=require("body-parser")
const Mongoose=require("mongoose")
const urlencoded = require("body-parser/lib/types/urlencoded")



let app=Express()
app.use(BodyParser.urlencoded({extended:true}))
app.use(BodyParser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

    var recipeModel=Mongoose.model("recepies",
    new Mongoose.Schema(
        {
            title:String,
category:String,
description:String,
prepared:String
        }
    ))
    Mongoose.connect("mongodb+srv://snehasam:snehasa4@cluster0.yyrcr.mongodb.net/Recepiedb")

app.post("/api/addrecepie",(req,res)=>{
var getTitle=req.body.title 
var getCategory=req.body.category
var getDescription=req.body.description
var getPrepared=req.body.prepared 
var data={"title":getTitle,"category":getCategory,"description":getDescription,"prepared":getPrepared}
 let recepieData=new recipeModel(data)
 recepieData.save((error,data)=>{
if(error)
{
    res.send({"status":"error","data":error})
}
else
{
    res.send({"status":"success","data":data})
}
 })

})

app.post("/api/delete",(req,res)=>{
    var getId=req.body
    recipeModel.findByIdAndRemove(getId,(error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
            res.send({"status":"success","data":data})
        }
    })
})

app.post("/api/searchrecepie",(req,res)=>{
var getTitle=req.body
recipeModel.find(getTitle,(error,data)=>{
    if(error)
    {
        res.send({"status":"error","data":error})
    }
    else
    {
        res.send({"status":"success","data":data})
    }
})
})

app.get("/api/viewerecepie",(req,res)=>{
recipeModel.find((error,data)=>{
    if(error)
    {
        res.send(error)
    }
else{
    res.send(data)
}
})
})

app.listen(7000,()=>{
    console.log("server running")
})