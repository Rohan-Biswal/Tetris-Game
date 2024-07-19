const mongoose=require("mongoose");
require("dotenv").config();
const DB_name="GAME";
const MONGO_SRV=process.env.MONGO_URL;
mongoose.connect(`${MONGO_SRV}${DB_name}`,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }).then(()=>{
    console.log("DataBases connected");
}).catch((err)=>{
    console.log(err);
})