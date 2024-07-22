const express=require("express");
const cors = require("cors");
require("./connect-db");
require("dotenv").config();
const app=express();
const port= process.env.PORT ||8400;
const tetrisM=require("./models/tetrisM");
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    return res.status(200).send("Hello Gamer");
});
app.get("/test",(req,res)=>{
    return res.status(200).send("Hello this is for testing");
});


app.post("/add-player-info",(req,res)=>{
    const playerInfo=req.body;
    const player=new tetrisM(playerInfo);
    console.log("just Checking");
    player.save().then(()=>{
        console.log("data of player Saved in database");
        return res.status(200).json("Player Data Saved");
    }).catch((err)=>{
        console.log(err);
        return res.status(500).json({
            message:"some Error"
        })
    })
})



app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})
