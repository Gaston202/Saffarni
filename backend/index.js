const express = require("express");
const connectDb = require("./Configuration/connectDB");
const app = express();
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();


const port = process.env.PORT || 6005;
connectDb();
app.listen(port, (error)=>{
    if(error){console.log("Server Failed")}
    else{ console.log(`Server Started on port ${port}`)}
})
app.use(cors());
app.use(express.json());

