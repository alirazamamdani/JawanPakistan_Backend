const express = require('express');
const cors = require('cors')
const bp = require('body-parser');
const app = express();
const port = 5000;
const mongoose = require("mongoose");
let authModel = require("./authSchema");
const { response } = require('express');


app.use(cors())
app.use(bp.urlencoded({
    extended: false
}))

app.use(bp.json());

mongoose.connect('mongodb+srv://aliraza:admin@123@cluster0.lufsb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected", ()=> {
    console.log("MongoDB Connected")
})

mongoose.connection.on("error", ()=> {
    console.log("Not Connected")
})


app.get('/', (req,res) => {
    res.send("Hello Pakistan ")
})

app.post("/signup", (req , res)=> {
    res.send("signup API")
   
let userCreate = new authModel({email:req.body.email, password: req.body.password})
userCreate.save()
.then((response)=>{
    
    // console.log(response,"response success")
     res.status(200).send({result:response, message: "Data Stored Successfully"})
})

.catch((err)=> {
   
    // console.log("error", err)
    return res.status(400).send({result: err.message, message: "Data Not Stored Successfully"})
})


})


app.listen(port, ()=> {
    console.log("Server is Running")    
})
