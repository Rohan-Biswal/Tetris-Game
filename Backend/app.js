const express=require("express");
const cors = require("cors");
require("./connect-db");
require("dotenv").config();
const app=express();
const port= process.env.PORT ||8400;
const tetrisM=require("./models/tetrisM");
app.use(cors(
    {
        origin:["https://tetris-game-frontend.vercel.app"],
        methods:["POST","GET","OPTIONS"],
        credentials:true
    }
));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
    next();
});

app.options("*", cors());

app.get("/",(req,res)=>{
    return res.status(200).send("Hello Gamer");
});

app.post("/add-player-info",(req,res)=>{
    const playerInfo=req.body;
    const player=new tetrisM(playerInfo);
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
