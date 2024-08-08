const mongoose= require("mongoose")
const express =require("express")
const cors = require("cors")
const multer = require("multer")
let app = express()
app.use(cors())
app.use(express.json()); // checks data in json format or not
app.use(express.urlencoded()) // checks data in url formate or not
const storage = multer.diskStorage({
    destination:  (req, file, cb)=> {
      cb(null, 'profilepics')
    },
    filename:  (req, file, cb)=> {
        console.log(file)
      cb(null, `${Date.now()}_${file.originalname}` )
    }
  })
  
  const upload = multer({ storage: storage })

let userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:String,
    mail:String,
    password:String,
    mobileNumber:String,
    profilePicture:String,
});
let User= new mongoose.model("user",userSchema);

app.post("/signup",upload.single("profilePicture"), async (req,res)=>{
    
    // res.json(["some dummy response."])
    console.log(req.body)
    console.log(req.file)
    
    
    try {
        let newUser= new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            age:req.body.age,
            mail:req.body.mail,
            password:req.body.password,
            mobileNumber:req.body.mobileNumber,
            profilePicture:req.file.path,
        
        });
        await User.insertMany([newUser])
        
        console.log(`saved success fully`)
        res.json({status:"success",msg:"Account Created"})
    } catch (error) {
        console.log(`unable to save`)
        console.log(error)
        res.json({status:"failed",msg:" unable to create Account ",err:error})
    }
})


try {
    let connectToMDB= mongoose.connect("mongodb+srv://pavanajjarapu007:pavan@pavankumar.eubtnkt.mongodb.net/?retryWrites=true&w=majority&appName=pavankumar") 
    console.log("connected to DB successfully.")
} catch (error) {
    console.log("Not connected to MDB.")
}
app.listen(2389,()=>{
    console.log(`listening to port 2389....`)
})

