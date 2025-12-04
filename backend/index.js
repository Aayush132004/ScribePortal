
const express=require("express");
const app=express();
require("dotenv").config();
const main=require("./src/config/DB");
const cookieParser = require('cookie-parser');
const authScribeRouter=require("./src/routes/userAuth")
const cors=require("cors");

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"]
}))




app.use(express.json());
app.use(cookieParser());

app.use("/auth",authScribeRouter);









//vercel hosting
const InitializeConnection=async()=>{
    try{
        
       await main()
       console.log("DB Connected");
       app.listen(process.env.PORT,()=>{
     console.log("listening on port "+ process.env.PORT);
 })
    }

   catch(err){
    console.log("Error:"+err);
   }
}

InitializeConnection();

